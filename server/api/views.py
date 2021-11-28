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
import inspect
# Create your views here.

def get_declared_fields (SerializerClass):
    '''
    a function that return a tuple of  (declared) attributes/fields of a multi-model serializer class)
    expressed as multiple steps for reusability
    '''
    attributes = inspect.getmembers(SerializerClass, lambda a:not(inspect.isroutine(a)))
    attributes = tuple ([a[1] for a in attributes if a[0] == '_declared_fields'])
    
    return tuple (attributes[0].keys())
class DashBoardViewSet (viewsets.ViewSet):
    def return_tuple_fields(self):
        tuple_fields = get_declared_fields(DashBoardSerializer)
        return (namedtuple (
            'DashBoard', tuple_fields)
        )
    def list(self, request):      
        dashboard = self.return_tuple_fields()(
            students = Student.objects.all(),
            schools = School.objects.all(),
            courses = Course.objects.all(),
            lessons = Lesson.objects.all(),
            tasks = Task.objects.all()
        )
        serializer = DashBoardSerializer(dashboard)
        
        return Response(serializer.data)
    
class CourseViewSet (viewsets.ViewSet):
    def list (self, request):
        courses = Course.objects.all() #query set
        serializer = CourseSerializer(courses, many = True, fields = ('course_name','date_start'))
        return Response (serializer.data)
        print (courses)
        