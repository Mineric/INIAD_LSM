from django.db.models import fields
from django.utils import tree
from .models import *

from rest_framework import serializers

from .serializer import DynamicFieldsModelSerializer

class AssignmentQuestionListSerializer(serializers.ListSerializer):
    def update(self, query, validated_data):
        for instance in validated_data:
                AssignmentQuestion.objects.filter(id=instance["id"]).update(**instance)

class AssignmentQuestionSerializer(DynamicFieldsModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        list_serializer_class = AssignmentQuestionListSerializer
        model = AssignmentQuestion
        fields = "__all__"
    
    def update(self, validated_data):
        AssignmentQuestion.objects.filter(id=validated_data["id"]).update(**validated_data)



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

    