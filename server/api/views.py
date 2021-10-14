from django.shortcuts import render
from .models import *
from .serializer import *

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView

from rest_framework import generics
from rest_framework import mixins

from rest_framework import viewsets
from django.shortcuts import get_object_or_404

from collections import namedtuple
# Create your views here.

DashBoard = namedtuple (
    'DashBoard', 
    ('student', 
     'schools', 
     'courses', 
     'lessons', 
     'tasks')
    )
class DashBoardViewSet (viewsets.ViewSet):
    def list(self, request):
        dashboard = DashBoard(
            student = Student.objects.all(),
            schools = School.objects.all(),
            courses = Course.objects.all(),
            lessons = Lesson.objects.all(),
            tasks = Task.objects.all()
        )
        serializer = DashBoardSerializer(dashboard)
        return Response(serializer.data)
    
class CourseViewSet (viewsets.ViewSet):
    def list (self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many = True, fields = ('course_name',))
        return Response (serializer.data)
