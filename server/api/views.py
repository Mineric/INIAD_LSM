from django.db.models import query
from django.shortcuts import render
from django.utils.translation import deactivate_all
from rest_framework import permissions
from rest_framework.views import APIView

from .models import *
from django.forms.models import model_to_dict
from .serializer import *
from .assignment_serializer import *


from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView

from rest_framework import generics
from rest_framework import mixins

from rest_framework import viewsets
from django.shortcuts import get_object_or_404

from collections import namedtuple
import inspect

# import of differernt view groups

from api.view_groups.course_views import *
from api.view_groups.assignment_views import *
# import of differernt view groups

# Create your views here.
class CreateCourseView(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    # permission_classes = [permissions.IsAuthenticated]

class CreateSchoolView(generics.CreateAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer

class StudentCourseView(APIView):
    # Register a course
    def post(self, request, pk, format=None):
        user = request.user
        try:
            student = Student.objects.get(pk=user.id)
        except Exception as e:
            print(e)
            return Response({"error": "You are not a student"}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            course = Course.objects.get(pk=pk)
        except Exception as e:
            print(e)
            return Response({"error": "This course does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        course.students.add(student)
        return Response({"message": "Registration completed."}, status=status.HTTP_201_CREATED)

    # Unregister a course
    def delete(self, request, pk, format=None):
        user = request.user
        try:
            student = Student.objects.get(pk=user.id)
        except Exception as e:
            print(e)
            return Response({"error": "You are not a student"}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            course = Course.objects.get(pk=pk)
        except Exception as e:
            print(e)
            return Response({"error": "This course does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        course.students.remove(student)
        return Response({"message": "Unregistration completed."}, status=status.HTTP_201_CREATED)


def get_declared_fields (SerializerClass):
    '''
    a function that return a tuple of  (declared) attributes/fields of a multi-model serializer class)
    expressed as multiple steps for reusability
    '''
    attributes = inspect.getmembers(SerializerClass, lambda a:not(inspect.isroutine(a)))
    attributes = tuple ([a[1] for a in attributes if a[0] == '_declared_fields'])
    
    return list (attributes[0].keys())

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
        serializer = CourseSerializer(courses, many = True, fields = ('course_name','date_start','date_end', 'course_id', 'course_image'))
        attributes = inspect.getmembers(CourseSerializer, lambda a:not(inspect.isroutine(a)))
        attributes = tuple ([a[1] for a in attributes if a[0] == '_declared_fields'])
        
        return Response (serializer.data)
        
class LessonViewSet (viewsets.GenericViewSet):
    visible_fields =  ('id','lesson_name','date_start', 'date_end', 'course_id') # used for editing fields in all methods 
    serializer_class = LessonSerializer
    queryset = Lesson.objects.all()
    def list (self, request):
        objects = Lesson.objects.all()
        serializer = LessonSerializer(objects, many = True, fields = self.visible_fields)
        return Response (serializer.data)
        
    def list_all (self):
        """
        (HIEU)list all the objects after editing something
        maybe used after create(), destroy(), update(), etc
        """
        objects = Lesson.objects.all()
        serializer = LessonSerializer(objects, many = True, fields = self.visible_fields)
        return Response (serializer.data)
    
    def create (self, request):
        serializer = LessonSerializer(data = request.data)
        
        if serializer.is_valid ():
            serializer.save()
            return self.list_all () 
        return Response(serializer.errors)
    
# Users
class WhoAmIView(APIView):
    """ Simple endpoint to test auth """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        """ Return request.user and request.auth """
        return Response({
            'request.user': model_to_dict(request.user),
            'request.auth': request.auth
        })
