class Plan < ApplicationRecord
  mount_uploader :planimg, PlanimgUploader

  extend FriendlyId
  friendly_id :title, use: :slugged

end
