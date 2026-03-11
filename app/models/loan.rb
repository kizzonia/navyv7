class Loan < ApplicationRecord

  extend FriendlyId
  friendly_id :business_name, use: :slugged

  belongs_to :user


  mount_uploader :bfs, BfsUploader
  mount_uploader :btr, BtrUploader
  mount_uploader :cr, CrUploader
  mount_uploader :bp, BpUploader
  mount_uploader :pfs, PfsUploader
  mount_uploader :ld, LdUploader




end
