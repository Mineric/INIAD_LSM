from datetime import time
from django.db import models
# from django.contrib.auth.models import AbstractUser
from django.db.models.enums import Choices
from django.utils import timezone
# from django.utils.translation import gettext_lazy as _
from api.models import ExpandedUser
from django.db.models.deletion import CASCADE

#change to real models later
from discuss.models import DmyLesson
# Create your models here.
NAME_MAX_LENGTH = 100



class Task (models.Model):
    user = models.ForeignKey(ExpandedUser,  on_delete = models.CASCADE)
    name = models.CharField(max_length=NAME_MAX_LENGTH)
    description = models.CharField(max_length= 500)
    class TASK_STATUS (models.IntegerChoices):
        TODO = 0, "to_do"
        DOING = 1, "doing"
        DONE = 2, "done"
    status = models.IntegerField(choices=TASK_STATUS.choices, default=TASK_STATUS.TODO )
    
    lesson = models.ForeignKey(DmyLesson, 
                               null = True, 
                               blank = True,
                               on_delete = models.CASCADE,
                               related_name= 'tasks'
                               )
    deadline = models.DateField(null = True, blank = True,)