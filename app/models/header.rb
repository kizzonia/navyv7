class Header < ApplicationRecord
  mount_uploader :headerimg, HeaderimgUploader
  mount_uploader :abtsectionimg, AbtsectionimgUploader
  mount_uploader :featheaderimg, FeatheaderimgUploader
  mount_uploader :plansimg, PlansimgUploader

end
