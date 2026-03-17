class AccountMailer < ApplicationMailer
  default :from => "noreply@navyscreditunion.com"
  def account_email(user, account)
    @user = user
    @account = account
     mail(to: user.email, subject: 'Account Onboarding')
  end
end
