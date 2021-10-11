from .models import *

from rest_framework import serializers

class StudentSerializer (serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"
        
class SchoolSerializer (serializers.ModelSerializer):
    class Meta:
        model = School
        fields = "__all__"
    
class CourseSerializer (serializers.ModelSerializer):
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
    student = StudentSerializer (many=True)
    schools = SchoolSerializer (many=True)
    courses = CourseSerializer (many=True)
    lessons = LessonSerializer (many=True)
    tasks   = TaskSerializer (many=True)
     