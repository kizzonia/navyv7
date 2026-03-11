ActiveAdmin.register Account do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
   permit_params :address, :country, :avatar, :lbalance, :phone, :zip_code, :ssn, :mmn, :account_pin, :account_number, :routine_number, :dob, :slug, :balance, :occupation_address, :user_id, :status, :verified
  #
  # or
  #
  # permit_params do
  #   permitted = [:address, :country, :avatar, :zip_code, :ssn, :mmn, :account_pin, :account_number, :routine_number, :dob, :slug, :balance, :occupation_address, :user_id]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  form do |f|

     f.inputs do
  f.input :user_id, :label => 'Users', :as => :select, :collection => User.all.map{|u| ["#{u.email}, #{u.first_name}", u.id]}

       f.input :balance, placeholder: "Current Balance"
       f.input :lbalance, placeholder: "Ledger Balance"

       f.input :status
       f.input :verified

       f.input :avatar, as: :file
     end
       f.submit :submit
     end
     controller do
            def find_resource
              scoped_collection.friendly.find(params[:id])
            end
          end
end
