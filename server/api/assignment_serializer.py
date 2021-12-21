from django.db.models import fields
from django.db.models.query import InstanceCheckMeta
from django.utils import tree
from .models import *
from .views import *
from rest_framework import serializers

from .serializer import DynamicFieldsModelSerializer

class AssignmentQuestionListSerializer(serializers.ListSerializer):
    # update
    # create if not exist
    def update(self, query, validated_data):
        return_instances = []
        for instance in validated_data:
            if "id" in instance.keys():
                # update return the number of rows being updated, not the object(s)
                AssignmentQuestion.objects.filter(id=instance["id"]).update(**instance)
                return_instances.append(AssignmentQuestion.objects.get(id=instance["id"]))
            else:
                # since the field in the model has the "_id" part and our original value of assignment form id was integer
                instance["assignment_form_id_id"] = instance.pop("assignment_form_id")
                i = AssignmentQuestion.objects.create(**instance)
                return_instances.append(i)     
        return return_instances

class AssignmentQuestionSerializer(DynamicFieldsModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        list_serializer_class = AssignmentQuestionListSerializer
        model = AssignmentQuestion
        fields = "__all__"
    
    def update(self, validated_data):
        if "id" in validated_data.keys():
            AssignmentQuestion.objects.filter(id=validated_data["id"]).update(**validated_data)
            instance = AssignmentQuestion.objects.get(id=validated_data["id"])      
        else:
            # since the field in the model has the "_id" part and our original value of assignment form id was integer
            validated_data["assignment_form_id_id"] = validated_data.pop("assignment_form_id")
            instance = AssignmentQuestion.objects.create(**validated_data)
        return instance

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
