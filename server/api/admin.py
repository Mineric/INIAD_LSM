from django.contrib import admin

# Register your models here.
from api.models import *
from discuss.models import *
class CourseAdmin (admin.ModelAdmin):
    pass
admin.site.register (Course, CourseAdmin)