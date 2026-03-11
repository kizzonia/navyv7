class TransferMailer < ApplicationMailer
  default :from => "support@royalstandard.co "
  def transfer_email(user, transfer)
    @user = user
    @transfer = transfer
     mail(to: user.email, subject: 'Your Transfer OTP')
  end
end
