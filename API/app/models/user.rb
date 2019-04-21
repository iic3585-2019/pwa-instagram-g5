class User < ApplicationRecord
  has_many :user_friends
  has_many :friends, through: :user_friends, dependent: :destroy
  has_many :posts
end
