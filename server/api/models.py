from datetime import time
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.enums import Choices
from django.utils import timezone

from django.db.models.deletion import CASCADE
# Create your models here.

NAME_MAX_LENGTH = 100
URL_MAX_LENGTH = 200

class ExpandedUser(AbstractUser):
    class USER_ROLE(models.TextChoices):
        STUDENT = "ST", "Student"
        LECTURER = "LT", "Lecturer"
    current_user_role = models.CharField(max_length=2, choices=USER_ROLE.choices, default=USER_ROLE.STUDENT)

    def save(self, *args, **kwargs):
        if not self.id:
            super().save(self, *args, **kwargs)
            current_user_role = self.USER_ROLE.choices.STUDENT
            user = ExpandedUser.objects.filter(id=self.id)
            student = Student.objects.create(user=user)
            lecturer = Lecturer.objects.create(user=user)


class Student(models.Model):
    user = models.OneToOneField(
        ExpandedUser,
        on_delete=models.CASCADE,
        primary_key=True
    )

class Lecturer(models.Model):
    user = models.OneToOneField(
        ExpandedUser,
        on_delete=models.CASCADE,
        primary_key=True
    )

class School(models.Model):
    school_name = models.CharField(max_length=NAME_MAX_LENGTH)
    school_description = models.TextField()

class Course(models.Model):
    name = models.CharField(max_length = NAME_MAX_LENGTH)
    description = models.TextField()
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    lecturers = models.ManyToManyField(Lecturer)
    storage_url = models.URLField(max_length=URL_MAX_LENGTH) # drive, box, etc.
    date_start = models.DateTimeField(default=timezone.now)
    date_end = models.DateTimeField(default=timezone.now)

    class OPEN_STATUS(models.IntegerChoices):
        YES = 1, "yes"
        NO = 0, "no"
    is_closed = models.IntegerField(choices=OPEN_STATUS.choices, default=OPEN_STATUS.NO)
    cost = models.FloatField()
    meeting_url = models.URLField(max_length=URL_MAX_LENGTH)

class Lesson(models.Model):
    lesson_name = models.CharField(max_length=NAME_MAX_LENGTH)
    course_id = models.ForeignKey(Course, on_delete=CASCADE)
    date_start = models.DateTimeField(default=timezone.now)
    date_end = models.DateTimeField(default=timezone.now)

class Task(models.Model):
    task_name = models.CharField(max_length=NAME_MAX_LENGTH)
    deadline = models.DateTimeField(default=timezone.now)
    student = models.ForeignKey(Student, on_delete=CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=CASCADE)
    class OPEN_STATUS(models.IntegerChoices):
        YES = 1, "yes"
        NO = 0, "no"
    is_done = models.IntegerField(choices=OPEN_STATUS.choices, default=OPEN_STATUS.NO)

