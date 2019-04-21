class PostUser < ApplicationRecord
  belongs_to :tagged_user, class_name: "User"
  belongs_to :post
end
