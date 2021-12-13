from django.db.models import fields
from django.utils import tree
from .models import *

from rest_framework import serializers

from .serializer import DynamicFieldsModelSerializer

class AssignmentQuestionSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = AssignmentQuestion
        fields = "__all__"

class AssignmentAnswerSerializer(DynamicFieldsModelSerializer):
    class Meta:
        models = AssignmentAnswer
        fields = "__all__"

class AssignmentQuestionWithAnswersSerializer(DynamicFieldsModelSerializer):
    answers = AssignmentAnswerSerializer(many=True)

    class Meta:
        models = AssignmentQuestion
        fields = "__all__"
 

class AssignmentFormSerializer(DynamicFieldsModelSerializer):
    assignment_questions = AssignmentQuestionSerializer(many=True,
        fields=(
            'id',
            'question',
            'order',
            'type',
        ))

    class Meta:
        model = AssignmentForm
        fields = "__all__"

class AssignmentFormWithAnswersSerializer(DynamicFieldsModelSerializer):
    assignment_questions = AssignmentQuestionWithAnswersSerializer(many=True)
    
    class Meta:
        models = AssignmentForm
        fields = "__all__"
        depth = 2 # traverse to answer

class LessonAssignmentFormsSerializer(serializers.Serializer):
    assignment_forms = AssignmentFormSerializer(many=True, 
        fields = (
            'id'
        ))

    