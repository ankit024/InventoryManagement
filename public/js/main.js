$(document).ready(() => {
  $('#loader').hide();
  let roleDefine = JSON.parse($.cookie("role"));
  let categoryDataChosen = $('.categoryDataChosen');
  let categoryDataChosenVendor1 = $('.categoryDataChosenVendor1');
  let categoryDataChosenVendor2 = $('.categoryDataChosenVendor2');
  let itemChosenVendor1 = $('.itemChosenVendor1');
  let itemChosenVendor2 = $('.itemChosenVendor2');
  let submitvendor1Form = $('.submitvendor1Form');
  let vendorSelectData = $('.vendorSelectData');
  let vendorSelectChosenQuantity = $('.vendorSelectChosenQuantity')
  let itemActiveCookieClick = $('.itemActiveCookieClick')
  let QuantityActiveCookieClick = $('.QuantityActiveCookieClick')

  let submitFormButton = $('.submitManagerForm');
  let cusiniesMultipleSelect = $('.cusiniesMultipleSelect');
  cusiniesMultipleSelect.chosen();

  vendorSelectData.chosen();
  itemChosenVendor1.chosen();
  itemChosenVendor2.chosen();

  if (roleDefine === 'chef') {
    itemActiveCookieClick.hide()
    QuantityActiveCookieClick.hide()
  }



  const fetchCategoryItemCall = () => {
    $('#mainLoader').show();
    const url = 'foodCategories';
    const queryData = {};
    XHRCall(url, queryData, true).then((responseData) => {
      let Data = responseData.response;
      Data.forEach((itemName, index) => {
        categoryDataChosen.append(`
        <option value='${itemName.name}'>${itemName.displayName}</option>
        `);
        categoryDataChosenVendor1.append(`
        <option value='${itemName.name}'>${itemName.displayName}</option>
        `);
        categoryDataChosenVendor2.append(`
        <option value='${itemName.name}'>${itemName.displayName}</option>
        `);

      });
      categoryDataChosen.chosen();
      categoryDataChosenVendor1.chosen();
      categoryDataChosenVendor2.chosen();
    });
  };

  submitFormButton.click(() => {
    let role = roleDefine;
    let category = $('.categoryDataChosen').val();
    let itemName = $('#itemDataAdd').val();
    let quantity = $('#inputQuantity').val();
    let foodCategory = $('.cusiniesMultipleSelect').val();
    if (itemName.length != 0 && quantity.length != 0) {
      $('#loader').show();
      const url = 'addRequirement';
      const queryData = { category, itemName, quantity, foodCategory, role };
      XHRCall(url, queryData, true).then((responseData) => {
        $('#loader').hide();
        $("form")[0].reset();
        $('.cusiniesMultipleSelect').chosen('destroy');
        $('.cusiniesMultipleSelect').chosen('');
      });
    }
  });

  categoryDataChosenVendor1.on('change', function (e) {
    $(itemChosenVendor1).empty();
    let categoryData = categoryDataChosenVendor1.val();
    let category = categoryData;
    let role = 'manager';
    const url = 'getItemName';
    const queryData = { category, role };
    XHRCall(url, queryData, true).then((responseData) => {
      let Data = responseData.response;
      Data.forEach((name, index) => {
        itemChosenVendor1.append(`
        <option dataId= '${name._id}' value='${name.itemName}'>${name.itemName}</option>
        `);

      });
      $(itemChosenVendor1).trigger("chosen:updated")
    });
  });


  submitvendor1Form.click(() => {
    let role = roleDefine;
    let _id = $('.itemChosenVendor1 option:selected').attr('dataId');
    let category = $('.categoryDataChosenVendor1').val();
    let itemName = $('.itemChosenVendor1').val()
    let vendor_name = vendorSelectData.val();
    let quantity = vendorSelectChosenQuantity.val();
    if (itemName.length != 0 && quantity.length != 0) {
      $('#loader').show();
      const url = 'addRequirementForVendor1';
      const queryData = { category, itemName, quantity, role, vendor_name, _id };
      XHRCall(url, queryData, true).then((responseData) => {
        console.log("TCL: responseData", responseData)
        $('#loader').hide();
        $("form")[0].reset();
      });
    }
  });

  fetchCategoryItemCall();




});








