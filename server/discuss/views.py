from django.shortcuts import render
from .models import *
from .serializer import *
from rest_framework.exceptions import ValidationError
from rest_framework import permissions
from rest_framework import mixins, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework import generics
from rest_framework import viewsets
from django.http import HttpResponse, JsonResponse
# Create your views here.
from django.shortcuts import get_object_or_404
class CommentList (generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save (poster = self.request.user)
        
class CommentUpdateRetrieveDestroy (generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def delete (self, request, *args, **kwargs):
        comment = Comment.objects.filter (pk = kwargs['pk'], poster = self.request.user)
        if comment.exists():
            return self.destroy(request, *args, **kwargs)
        else:
            raise ValidationError ('The comment is not yours!')
    
        
class VoteCreate (generics.CreateAPIView, mixins.DestroyModelMixin):

    serializer_class = VoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        postTxt = PostTxt.objects.get(pk =self.kwargs['pk'])
        return Vote.objects.filter (voter = user, postTxt = postTxt)
    
    def perform_create(self, serializer):
        if self.get_queryset().exists():
            raise ValidationError ('Appreciate your love but you have already voted')
        
        # else:
        serializer.save (voter = self.request.user,
                         postTxt = PostTxt.objects.get(pk =self.kwargs['pk']))
        
    def delete (self, request, *args, **kwargs):
        if self.get_queryset().exists():
            self.get_queryset().delete()
            return Response (status=status.HTTP_204_NO_CONTENT)
        else :
            return  ValidationError ('You never voted for this comment')
        
# changing to Generic Viewset

class DmyCourseViewSet (viewsets.GenericViewSet):
    serializer_class = DmyCourseSerializer
    queryset = DmyCourse.objects.all()
    def get_serializer_class(self):
        if self.action in ["create_comment", "update_comment"]:
            return CommentSerializer
        
        elif self.action in ["create_reply", "update_reply"]:
            return ReplySerializer

        elif self.action in ["create_vote"]:
            return VoteSerializer
        
        else: 
            return DmyCourseSerializer
    
    def list (self, request):
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        queryset = DmyCourse.objects.all()
        instance = get_object_or_404(queryset, pk=pk)
        serializer = DmyCourseSerializer(instance)
        return Response(serializer.data)
    
    @action (detail = True,  methods=['post'])
    def create_comment(self, request, pk = None):
        serializer = CommentSerializer(data = request.data)
        poster = self.request.user
        if serializer.is_valid():
            serializer.save (poster = poster, course_id = pk)
            return Response(serializer.data)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)
    
    @action (detail = True,  methods=['put'])    
    def update_comment(self, request, pk = None):
        try:
            instance = Comment.objects.get(id = request.data["id"])
        except Comment.DoesNotExist():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if request.method == 'PUT':  
            serializer = CommentSerializer(instance, data=request.data)  
            if serializer.is_valid():
                serializer.save ()
                # return Response({"updated_comment": serializer.data,})
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action (detail = True,  methods=['post'])
    def create_reply(self, request, pk = None):
        serializer = ReplySerializer(data = request.data)
        poster = self.request.user
        if serializer.is_valid():
            serializer.save (poster = poster)
            return Response(serializer.data)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)
        
    @action (detail = True,  methods=['put'])
    def update_reply(self, request, pk = None):
        try:
            instance = Reply.objects.get(id = request.data["id"])
        except Reply.DoesNotExist():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if request.method == 'PUT':  
            serializer = ReplySerializer(instance, data=request.data)  
            if serializer.is_valid():
                serializer.save ()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    @action (detail = True,  methods=['post'])
    def create_vote(self, request, pk = None):
        serializer = VoteSerializer(data = request.data)
        voter = self.request.user
        if serializer.is_valid():
            serializer.save (voter = voter)
            return Response(serializer.data)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)
