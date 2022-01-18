from django.shortcuts import render
from .models import *
from .serializer import *
from rest_framework import permissions
from rest_framework import mixins, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
# Create your views here.
class  TaskViewSet (viewsets.GenericViewSet):
    serializer_class = TaskSerializer
    # queryset = Task.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset (self):
        return Task.objects.filter(user=self.request.user)
    
    def list (self,request):
        serializer = self.get_serializer(self.get_queryset(), many = True)
        return Response(serializer.data)
    
    def create (self, request):
        serializer = TaskSerializer(data = request.data)
        user = self.request.user
        if serializer.is_valid():
            serializer.save (user = user)
            return Response(serializer.data)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST )
    
    def update (self, request, pk = None):
        try:
            instance = Task.objects.get(id = pk)
        except Task.DoesNotExist():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = TaskSerializer(instance, data = request.data)
        user = self.request.user
        if serializer.is_valid ():
            serializer.save ()
            return Response(serializer.data)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST )
    
    def destroy (self, request, pk = None):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)