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


# Assignment Views

class AssignmentFormViewSet(viewsets.GenericViewSet):
    serializer_class = AssignmentFormSerializer 
    # permission_classes = []

    # only get assignment form of current teacher, and current lecture
    def get_queryset(self):
        # queryset = AssignmentForm.objects.all()
        # lecturer = Lecturer.objects.filter(user_id=self.request.user.id)
        # lesson_id = self.pk
        # print(lecturer)
        # # if lecturer is not None and lesson is not None:
        # if lesson_id is not None: # for now 
        #     # queryset = AssignmentQuestion.objects.filter(lecturer__in=lecturer, lesson_id=lesson_id)
        #     queryset = AssignmentForm.objects.filter(lesson_id=lesson_id)
        #     queryset = AssignmentQuestion.objects.filter(assignment_form_id__in=queryset)
        queryset = AssignmentForm.objects.all()
        return queryset

    def list(self, request):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data)
    
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
        # print("---------------------------------")
        # print(self.reverse_action('list-by-lesson', args=['1']))
        # print("---------------------------------")
        queryset = AssignmentForm.objects.all()
        lecturer = Lecturer.objects.filter(user_id=self.request.user.id)
        lesson_id = pk
        # if lecturer is not None and lesson is not None:
        if lesson_id is not None: # for now 
            # queryset = AssignmentQuestion.objects.filter(lecturer__in=lecturer, lesson_id=lesson_id)
            queryset = AssignmentForm.objects.filter(lesson_id=lesson_id)
            print(queryset)
            # queryset = AssignmentQuestion.objects.filter(assignment_form_id__in=queryset)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        return Response({"error": "Data not found"}, status.HTTP_400_BAD_REQUEST)

class AssignmentQuestionViewSet(viewsets.GenericViewSet):
    serializer_class = AssignmentQuestionSerializer
    queryset = AssignmentQuestion.objects.all()
    def list (self, request):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data)
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.save(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    def retrieve (self, request, pk ):
        instance = get_object_or_404(self.get_queryset(), pk = pk)
        serializer = self.get_serializer(instance)
        return Response (serializer.data)


class AssignmentQuestionWithAnswersViewset (viewsets.GenericViewSet):    
    serializer_class = AssignmentQuestionWithAnswersSerializer 
    queryset = AssignmentQuestion.objects.all ()
    def list (self, request):
        serializer = self.get_serializer(self.get_queryset(), many = True)
        # print (dir(AssignmentQuestion)) # (debug)
        return Response (serializer.data)

    def retrieve (self, request, pk ):
        instance = get_object_or_404(self.get_queryset(), pk = pk)
        serializer = self.get_serializer(instance)
        return Response (serializer.data)


class AssignmentFormWithAnswersViewSet (viewsets.GenericViewSet):
    """
    serializer: AssignmentFormWithAnswersSerializer  
    """
    serializer_class = AssignmentFormWithAnswersSerializer
    queryset = AssignmentForm.objects.all()
    def list (self, request):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data)
    def retrieve (self, request, pk ):
        instance = get_object_or_404(self.get_queryset(), pk = pk)
        serializer = self.get_serializer(instance)
        return Response (serializer.data)


        
    

class LessonAssignmentFormsViewSet(viewsets.GenericViewSet):
    """
    Hieu: to show all the assignment forms from a lessons
    """
    serializer_class = LessonAssignmentFormsSerializer
    queryset = AssignmentForm.objects.all()
    def list (self, request):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data)

    # def retrieve(self, request, pk):
    #     # lesson_id = request.query_params.get('lesson_id')
    #     lesson_id = pk
    #     if lesson_id is not None:
    #         assignment_forms = AssignmentForm.objects.filter(lesson_id=lesson_id)
    #         serializer = LessonAssignmentFormsSerializer(data={'assignment_forms': assignment_forms}, many=True)
    #         serializer.is_valid()
    #         print(serializer.data)
    #         return Response(serializer.data)
    #     else:
    #         return Response({"error": "wrong parameters"}, status.HTTP_405_METHOD_NOT_ALLOWED)
        
# End of Assignment Views