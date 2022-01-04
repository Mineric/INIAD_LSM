from django.db.models import query
from django.shortcuts import render
from rest_framework import permissions
from rest_framework.views import APIView

from ..models import *
from django.forms.models import model_to_dict
from ..serializer import *
from ..assignment_serializer import *
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

from drf_firebase_auth.authentication import FirebaseAuthentication


# Assignment Views

class AssignmentFormViewSet(viewsets.GenericViewSet):
    serializer_class = AssignmentFormSerializer 
    queryset = AssignmentForm.objects.all()
    # permission_classes = []

    # only get assignment form of current teacher, and current lecture
    def get_queryset(self):
        pass

    def list(self, request):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data)
    
    def retrieve (self, request, pk ):
        instance = get_object_or_404(self.get_queryset(), pk = pk)
        serializer = self.get_serializer(instance)
        return Response (serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.create(validated_data=serializer.data, lecturer_id=request.user.id)
            serializer = self.get_serializer(instance=instance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response({"Error: ": "Cannot create new assignment form."}, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['get'])
    def list_by_lesson(self, request, pk=None):
        queryset = AssignmentForm.objects.all()
        lecturer = Lecturer.objects.filter(user_id=self.request.user.id)
        lesson_id = pk
        # if lecturer is not None and lesson is not None:
        if lesson_id is not None: # for now 
            # queryset = AssignmentQuestion.objects.filter(lecturer__in=lecturer, lesson_id=lesson_id)
            queryset = AssignmentForm.objects.filter(lesson_id=lesson_id)
            # queryset = AssignmentQuestion.objects.filter(assignment_form_id__in=queryset)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        return Response({"error": "Data not found"}, status.HTTP_400_BAD_REQUEST)

class AssignmentQuestionViewSet(viewsets.GenericViewSet):
    serializer_class = AssignmentQuestionSerializer
    queryset = AssignmentQuestion.objects.all()

    def list(self, request):
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def update_bulk(self, request):
        data = request.data
        # single data
        if not isinstance(data, list):
            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                instances = serializer.update(serializer.data)
                # to return them
                serializer = self.get_serializer(instance=instances)
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED) 
            else:
                print(serializer.errors)
                return Response({'error': 'Cannot UPDATE or CREATE'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        # bulk data
        else:
            serializer = self.get_serializer(data=data, many=True)
            if serializer.is_valid():
                instances = serializer.update(self.queryset, serializer.data)
                # to return them
                serializer = self.get_serializer(instance=instances, many=True)
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED) 
            else:
                print(serializer.errors)
                return Response({'error': 'Cannot UPDATE or CREATE'}, status=status.HTTP_406_NOT_ACCEPTABLE)

class AssignmentAnswerViewSet(viewsets.GenericViewSet):
    serializer_class = AssignmentAnswerSerializer 
    queryset = AssignmentAnswer.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    
    def retrieve (self, request, pk ):
        instance = get_object_or_404(self.get_queryset(), pk = pk)
        serializer = self.get_serializer(instance)
        return Response (serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.save(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['get'])
    def list_by_lesson(self, request, pk=None):
        try:
            student = Student.objects.filter(user_id__id=request.user.id)[0]
        except Exception as e:
            return Response({"error": str(e)}, status.HTTP_400_BAD_REQUEST)
        lesson_id = pk
        lesson = Lesson.objects.get(id=lesson_id)
        # if lecturer is not None and lesson is not None:
        if student is not None and lesson_id is not None: # for now 
            serializer = self.get_serializer()
            queryset = serializer.retrieve_by_lesson(lesson, student)
            print(queryset)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        return Response({"error": "Data not found"}, status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def list_all_by_lesson(self, request, pk=None):
        queryset = AssignmentAnswer.objects.all()
        user_id = request.user.id
        try:
            lecturer = Lecturer.objects.filter(user_id__id=user_id)[0]
        except Exception as e:
            return Response({"error": "Not authorized to get the answers."}, status.HTTP_400_BAD_REQUEST)
        lesson_id = pk
        # lesson = Lesson.objects.get(id=lesson_id, course_id__lecturers=lecturer)
        lesson = Lesson.objects.get(id=lesson_id)
        # if lecturer is not None and lesson is not None:
        if lecturer is not None and lesson: # for now 
            serializer = self.get_serializer()
            queryset = serializer.retrieve_all_by_lesson(lesson)
            print(queryset)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        return Response({"error": "Data not found"}, status.HTTP_400_BAD_REQUEST)

    # update with arrray
    # update and create if not existed (no 'id' provided)
    @action(detail=False, methods=['post'])
    def update_bulk(self, request):
        data = request.data
        serializer = self.get_serializer(data=data, many=True)
        if serializer.is_valid():
            wrapping_data = {"data": serializer.data}
            wrapping_data["student_id"] = request.user.id
            instances = serializer.update(self.queryset, wrapping_data)
            # re-serialize to response
            serializer = self.get_serializer(instance=instances, many=True)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED) 
        else:
            print(serializer.errors)
            return Response({'error': 'Cannot UPDATE or CREATE'}, status=status.HTTP_406_NOT_ACCEPTABLE)
 
# End of Assignment Views