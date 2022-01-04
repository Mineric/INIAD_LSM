from django.shortcuts import render
from .models import *
from .serializer import *
from rest_framework import generics
# Create your views here.

class CommentList (generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer