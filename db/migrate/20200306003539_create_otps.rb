class CreateOtps < ActiveRecord::Migration[5.2]
  def change
    create_table :otps do |t|
      t.string :otp
      t.references :transfer, foreign_key: true

      t.timestamps
    end
  end
end
