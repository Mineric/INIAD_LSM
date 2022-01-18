from django.db.models import fields
from django.db.models.query import InstanceCheckMeta
from django.utils import tree
from .models import *

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
