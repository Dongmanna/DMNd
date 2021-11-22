# main/models.py
from __future__ import unicode_literals

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone
from user.models import CustomUser


class Post(models.Model):
    objects = models.Manager()

    # 자동입력 필드: 작성자, 작성일시, 지역
    author = models.ForeignKey(
        'user.CustomUser', on_delete=models.CASCADE, related_name='post_author')
    pub_date = models.DateTimeField(default=timezone.now)
    region = models.CharField(max_length=50, blank=True, null=True)

    # 필수 필드: 카테고리, 제목, 글내용, 품목, 정원(1-10명)
    category = models.CharField(max_length=20,
                                choices=(
                                    ('Offline', '오프라인'),
                                    ('Online', '온라인'),
                                    ('Delivery', '배달음식'),
                                ))
    title = models.CharField(max_length=150)
    body = models.TextField(default='')
    item = models.CharField(max_length=50)
    limit = models.PositiveIntegerField(
        default=1, validators=[MinValueValidator(1), MaxValueValidator(10)])
    chatroom = models.URLField(max_length=300)

    # 비필수 필드: 링크, 가격, 마감기한, 사진
    link = models.URLField(max_length=300, blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    deadline = models.DateField(blank=True, null=True)
    image = models.ImageField(blank=True, null=True, upload_to="post/images")

    # 공동구매 참여자
    members = models.ManyToManyField(
        CustomUser, blank=True, related_name='members')
    # 공동구매 완료 여부
    done = models.BooleanField(default=False)

    def __str__(self):
        return self.title


# 공동구매 완료 버튼을 누른 사용자를 저장하기 위한 모델
class DoneRegister(models.Model):
    objects = models.Manager()
    post = models.OneToOneField(
        'Post', on_delete=models.CASCADE, related_name='done_post')
    # 공동구매 완료 버튼을 누른 사용자들
    users = models.ManyToManyField(
        CustomUser, blank=True, related_name='done_users')


class Comment(models.Model):
    objects = models.Manager()
    post = models.ForeignKey(
        'Post', on_delete=models.CASCADE, related_name='comment_post')
    author = models.ForeignKey(
        'user.CustomUser', on_delete=models.CASCADE, related_name='comment_author')
    pub_date = models.DateTimeField(default=timezone.now)
    content = models.TextField(default='')
