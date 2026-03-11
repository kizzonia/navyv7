class Account < ApplicationRecord
  mount_uploader :avatar, AvatarUploader

  extend FriendlyId
  friendly_id :account_number, use: :slugged
  belongs_to :user
  
  validates :balance, presence: true
  before_validation :load_defaults
  has_many :transfers, dependent: :destroy
  accepts_nested_attributes_for :transfers

  def load_defaults
    if self.new_record?
      self.balance = 0.00
      length = 8
      self.account_number = SecureRandom.random_number(10000000000)
      self.routine_number = SecureRandom.random_number(1000000000)
      self.status = "false"
    end
  end
end
