ActiveAdmin.register Transaction do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
   permit_params :amount, :transac_type, :date, :record, :purpose, :sender, :status, :user_id, :slug, :transaction_id, :bal_type
  #
  # or
  #
  # permit_params do
  #   permitted = [:permitted, :attributes]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  form(:html => { :multipart => true }) do |f|

     f.inputs do
       f.input :user_id, :label => 'Users/Client', :as => :select, :collection => User.all.map{|u| ["#{u.email}", u.id]}
       f.input :amount
       f.input :transac_type, as: :select, :collection => ["Wire Transfer", "ACH Transfer","Direct Deposits", "Cash Withdrawal", "Cash Deposit"]
       f.input :sender, label: " Name of sender"

       f.input :purpose, label: " Purpose Of Transfer"
       f.input :bal_type, :as => :select, :collection => ["Credit", "Debit"], label: "Record Credit/debit"
       f.input :status, as: :boolean
       f.input :date
     end
     f.submit :submit
   end

end
