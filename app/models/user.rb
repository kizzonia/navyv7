class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable, :lockable, :timeoutable

has_many :accounts, dependent: :destroy
has_many :transfers, dependent: :destroy
has_many :transactions, dependent: :destroy
has_many :bills, dependent: :destroy
has_many :cards, dependent: :destroy
has_many :deposits, dependent: :destroy

has_many :loans, dependent: :destroy


before_validation :load_defaults
def load_defaults
  if self.new_record?
    self.verified = true
    self.status = false

  end
end

end
