from django.db.models import fields
from django.utils import tree
from .models import *
from .views import *
from rest_framework import serializers

from .serializer import DynamicFieldsModelSerializer

class AssignmentQuestionSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = AssignmentQuestion
        fields = "__all__"
        depth = 1

class AssignmentAnswerSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = AssignmentAnswer
        fields = "__all__"
        # depth = 1

class AssignmentQuestionWithAnswersSerializer(DynamicFieldsModelSerializer):
    """
    Hieu: This class serializes: 
    (1)the question (AssignmentQuestion), and 
    (2)answers: all the submitted answers of that questions (AssignmentAnswer class) 
    """
    answers = AssignmentAnswerSerializer(many=True)
    class Meta:
        model = AssignmentQuestion
        fields = "__all__"

class AssignmentFormSerializer(DynamicFieldsModelSerializer):
    
    """
    Hieu: This class serializes:
    (1) All the assignments, and 
    (2) All the questions that belong to each assignment
    """
    class Meta:
        model = AssignmentForm
        fields = "__all__"
    assignment_questions = AssignmentQuestionSerializer(many=True,
        fields=(
            'id',
            'question',
            'order',
            'type',
        ))

class AssignmentFormWithAnswersSerializer(DynamicFieldsModelSerializer):
    """
    Hieu: This class serializes: 
    (1)the Assignment Form (AssignmentForm class), and 
    (2)all the questions from that assignment form along with (3)all the submitted answer for each question
    """
    class Meta:
        model = AssignmentForm
        fields = "__all__"
        # depth = 2 # traverse to answer
    assignment_questions = AssignmentQuestionWithAnswersSerializer(many=True)
    
    
    def create (self, validated_data):
        return
    
    
class LessonAssignmentFormsSerializer(serializers.Serializer):
    """
    Hieu: This class serializes all the assignments from a lesson (Not done)
    """
    assignment_forms = AssignmentFormSerializer(many=True, 
        fields = (
            'id'
        ))
