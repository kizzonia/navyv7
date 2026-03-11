class Transfer < ApplicationRecord
  belongs_to :user
  before_validation :load_defaults
  has_many :otps, dependent: :destroy
    extend FriendlyId
    friendly_id :account_number, use: :slugged
  def load_defaults
    if self.new_record?
      self.otp = SecureRandom.random_number(1000000)
      self.tref = SecureRandom.random_number(1000000000)

      self.confirmed = false
      self.status = false

    end
  end
end
