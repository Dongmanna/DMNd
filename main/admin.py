# main/admin.py
from django.contrib import admin
from .models import Post, Comment, DoneRegister

admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(DoneRegister)