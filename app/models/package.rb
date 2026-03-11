class Package < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged
  mount_uploader :pkimg, PkimgUploader
end
