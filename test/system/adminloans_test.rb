require "application_system_test_case"

class AdminloansTest < ApplicationSystemTestCase
  setup do
    @adminloan = adminloans(:one)
  end

  test "visiting the index" do
    visit adminloans_url
    assert_selector "h1", text: "Adminloans"
  end

  test "creating a Adminloan" do
    visit adminloans_url
    click_on "New Adminloan"

    fill_in "Body", with: @adminloan.body
    fill_in "Loan", with: @adminloan.loan_id
    check "Status" if @adminloan.status
    fill_in "Title", with: @adminloan.title
    fill_in "User", with: @adminloan.user_id
    check "Verified" if @adminloan.verified
    click_on "Create Adminloan"

    assert_text "Adminloan was successfully created"
    click_on "Back"
  end

  test "updating a Adminloan" do
    visit adminloans_url
    click_on "Edit", match: :first

    fill_in "Body", with: @adminloan.body
    fill_in "Loan", with: @adminloan.loan_id
    check "Status" if @adminloan.status
    fill_in "Title", with: @adminloan.title
    fill_in "User", with: @adminloan.user_id
    check "Verified" if @adminloan.verified
    click_on "Update Adminloan"

    assert_text "Adminloan was successfully updated"
    click_on "Back"
  end

  test "destroying a Adminloan" do
    visit adminloans_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Adminloan was successfully destroyed"
  end
end
