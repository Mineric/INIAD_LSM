from django.contrib import admin
from api.models import *
from discuss.models import *
# Register your models here.
admin.site.register (Comment)
admin.site.register (Reply)
admin.site.register (Vote)
admin.site.register (DmyCourse)
admin.site.register (DmyLesson)

class UserAdmin (admin.ModelAdmin):
    pass
admin.site.register (ExpandedUser)