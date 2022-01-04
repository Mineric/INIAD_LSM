from datetime import time
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.enums import Choices
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from api.models import ExpandedUser
from django.db.models.deletion import CASCADE
# Create your models here.
NAME_MAX_LENGTH = 100
URL_MAX_LENGTH = 200

class DmyCourse(models.Model):
    course_name = models.CharField(max_length = NAME_MAX_LENGTH)
    
class DmyLesson (models.Model):
    lesson_name = models.CharField(max_length=NAME_MAX_LENGTH)
    course_id = models.ForeignKey(DmyCourse, on_delete=CASCADE)


class Comment (models.Model):
    course = models.ForeignKey(DmyCourse, 
                               null = True,
                               # blank = False, form validation
                               on_delete = models.CASCADE,
                               related_name= 'comments'
                               )
    lesson = models.ForeignKey(DmyLesson, 
                               null = True, 
                               on_delete = models.CASCADE,
                               related_name= 'comments'
                               )
    poster = models.ForeignKey(ExpandedUser, on_delete = models.CASCADE)
    name = models.CharField(max_length= NAME_MAX_LENGTH)
    body = models.TextField()
    created = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=True) # FOR DELETE OR DISABLE COMMENT
    class Meta:
        ordering = ('created',)
    def __str__(self):
        return 'Comment by {} on {}'.format (self.name, self.lesson)
    
class Vote (models.Model):
    voter = models.ForeignKey(ExpandedUser, on_delete = models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete = models.CASCADE)