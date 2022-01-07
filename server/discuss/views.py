from django.shortcuts import render
from .models import *
from .serializer import *
from rest_framework import generics
from rest_framework.exceptions import ValidationError
from rest_framework import permissions
from rest_framework import mixins, status
from rest_framework.response import Response
# Create your views here.

class CommentList (generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save (poster = self.request.user)
        
class CommentRetrieveDestroy (generics.RetrieveDestroyAPIView):
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