from .models import *

from rest_framework import serializers

import inspect
class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that 
        - takes an additional `fields` argument that controls which fields should be displayed.
        - takes an additional `exclude_fields` argument that controls which fields should NOT be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)
        exclude_fields = kwargs.pop('exclude_fields', None)
        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set()
            if type (fields) == type ('str'): # H: fool-proof
                allowed = set(list([fields]))
            else: allowed = set(fields)
            existing = set(self.fields)

            for field_name in existing - allowed:
                self.fields.pop(field_name)
        
        if exclude_fields is not None:
            not_allowed = set()
            if type (not_allowed) == type ('str'): # H: fool-proof
                not_allowed = set(list([exclude_fields]))
            else: not_allowed =set (exclude_fields)
            for field_name in exclude_fields:
                self.fields.pop (field_name)
    
class StudentSerializer (DynamicFieldsModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"
        
class SchoolSerializer (DynamicFieldsModelSerializer):
    class Meta:
        model = School
        fields = "__all__"
    
class CourseSerializer (DynamicFieldsModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"
        
        
class LessonSerializer (DynamicFieldsModelSerializer):
    class Meta:
        model = Lesson
        fields = "__all__"
        
class TaskSerializer (DynamicFieldsModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"
        
class DashBoardSerializer (serializers.Serializer):
    
    students = StudentSerializer(many=True)
    schools = SchoolSerializer (many=True)
    courses = CourseSerializer (
        many=True,
        fields = (
            "course_name",
            "course_description",
            "lecturers",
            "date_start",
            "date_end"
            )
        )
    lessons = LessonSerializer (
        many = True,
        fields = (
            "lesson_name",
            "date_start",
            "date_end"
        )
    )
    tasks  = TaskSerializer (
        many=True,
        exclude_fields = (
            "student_id",
            )
        )
