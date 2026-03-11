class AddPhoneToAccounts < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :phone, :string
  end
end
