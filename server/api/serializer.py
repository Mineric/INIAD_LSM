from .models import *

from rest_framework import serializers

class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set()
            if type (fields) == type ('str'): # H: foll-proof
                allowed = set(list([fields]))
            else: allowed = set(fields)
            existing = set(self.fields)

            for field_name in existing - allowed:
                self.fields.pop(field_name)
    
class StudentSerializer (serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"
        
class SchoolSerializer (serializers.ModelSerializer):
    class Meta:
        model = School
        fields = "__all__"
    
class CourseSerializer (DynamicFieldsModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"
        
        
class LessonSerializer (serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = "__all__"
        
class TaskSerializer (serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"
        
class DashBoardSerializer (serializers.Serializer):
    
    student = StudentSerializer(many=True)
    schools = SchoolSerializer (many=True)
    courses = CourseSerializer (many=True, fields = ("course_name","course_description"))
    lessons = LessonSerializer (many=True)
    tasks   = TaskSerializer (many=True)
