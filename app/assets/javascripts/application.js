/* global $ */

//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//


$(document).ready(function () {
})

// Turn off autocomplete on all forms and inputs
$(".form").attr("autocomplete", "off");
$(".govuk-input").attr("autocomplete", "off");


// Hide and show things with js classes
$('.js-hidden').hide();

$('.js-show-hidden').click(function(e) {
  e.preventDefault();
  $('.js-hidden').show()
});

$('.js-edit-name').click(function(e) {
  $(this).text($(this).text() == 'Edit' ? 'Cancel' : 'Edit');
  $(this).closest('.govuk-checkboxes__item').next().find('.js-edit-name-field').toggle()

  if ($(this).parent().siblings('input').is(':not(:checked)')) {
    $(this).parent().siblings('input').click()
  }
});

$('.js-edit-address').click(function(e) {
  $(this).text($(this).text() == 'Edit' ? 'Cancel' : 'Edit');
  $(this).closest('.govuk-checkboxes__item').next().find('.js-edit-address-fields').toggle()

  if ($(this).parent().siblings('input').is(':not(:checked)')) {
    $(this).parent().siblings('input').click()
  }
});

$('.js-toggle-hint .govuk-checkboxes__input').click(function(e) {
  $(this).siblings('.govuk-hint').toggle();
});

// Add new address
$('.js-select-all-group').find('.govuk-checkboxes__item:last').hide();

$('.js-add-address').click(function(e) {
  $(this).prev().find('.govuk-checkboxes__item:last')
  .show()
  .find('input[type=checkbox]').prop('checked', true)
  .parent().next().removeClass('govuk-checkboxes__conditional--hidden')
});


// New address type toggels inputs
$('.js-new-address input:radio').change(function () {
  const container = $(this).parents('.js-new-address-cont')

  container.find('.govuk-form-group').show()

  if ($(this).val() == 'Overseas') {
    container.find('.govuk-form-group:last-of-type').hide()
  }
  else if ($(this).val() == 'DX') {
    container.find('.govuk-form-group:nth-of-type(n+5)').hide()
  }
});

// Add the MOJ add another functionality
// new MOJFrontend.AddAnother($('.moj-add-another'));

// Notices autocomplete
const notices = [
  'B1 Application to Register a Deed',
  'B10 A(ADJ) To Registered Prop-Bankruptcy Enquiry Notice to Adj Office',
  'B10 A(CT) To Registered Prop-Bankruptcy Enquiry Notice to Court',
  'B10 To Registered Prop-Bankruptcy Notice',
  'B104 Notice of a New Official Plan',
  'B105-To Reg\'d Prop of intermediate lessor-appn for extended lease',
  'B106-To Reg\'d Chargee-Notice of appn for an extended lease',
  'B107 To Registered Prop-Appn for Adverse Poss',
  'B108 To Chargee-Appn for Adverse Poss',
  'B109 To Lesser-Appn for Adverse Poss of Lessee\'s Title',
  'B11 To Registered Prop Land-Charge Bankruptcy Restriction',
  'B110 To Person Entitled to be Notified-Appn for Adv Poss Cancel Interest',
  'B111 To Person Entitled to be Notifield-2nd Appn for Adv Poss-Cancel Interest',
  'B112 To Lessor-2nd Appn for Adv Poss of Lessee\'s Title',
  'B113 To Reg\'d Prop-2nd Appn for Adv Poss',
  'B114 To Chargee-2nd Appn for Adv Poss',
  'B115 To Reg\'d Prop-Entry of Interested Party re Adv Poss',
  'B116 To Chargee-Appn for Adv Poss free of charge (Trans Provs)',
  'B117-1 To Reg\'d Prop-Appn for Adv Poss',
  'B117-2 To person entitled to be reg prop-Appn for Adv Poss',
  'B118 Notice of an application for cancellation of an entry on the register',
  'B119 To Owner Adj Unreg Land-Appn to Determine Boundary',
  'B12 Cancellation of Bankruptcy Inhibition-Restriction',
  'B120 To Owner Adj Reg\'d Land-Appln to Determine Boundary',
  'B121 To Chargee-Appn to Determine Boundary',
  'B122 To Cautioner-Appn for FR Affecting Ctn Title',
  'B123 To Cautioner-Appn to Register an Agreed Maxi Amount',
  'B124 To Cautioner-Appn to Cancel CTN Against FR',
  'B125 To Chargee-Appn for RXN Against Charge (Obj Notice)',
  'B125(CO) To Chargee-Appn for RXN Against Charge OBJ notice',
  'B125(HSS) To Chargee-Appn for RXN Against Charge OBJ notice',
  'B125(LAA) To Chargee-Appn for RXN Against Charge OBJ notice',
  'B125(TIB) To Chargee-Appn for RXN Against Charge OBJ notice',
  'B126 To Chargee-Appn for RXN Against Charge (Info Notice)',
  'B127 To Cautioner-Appn Affecting Caution Title',
  'B128 To Registered Prop-Registration of an Overriding Interest',
  'B129 To Lessor-Application to Register a Lease',
  'B13 Notice of Easements or Other Rights',
  'B130 To Interest Party-Application to Note a Lease',
  'B131 To Chargee-Appn for Adv Poss subject to charge (Trans Provs)',
  'B132 To Registered Prop-Appn to Enter an Agreed Notice',
  'B132(OI) To Reg\'d Prop-Agreed notice application re ORI',
  'B133 To Registered Prop-Appn to Enter a Unilateral Notice',
  'B133(OI) To Reg\'d Prop-Unilateral notice application re ORI',
  'B134 To Beneficiary Unliteral Notice-Appn for New-Extra Beneficiary',
  'B135 (CYM) To Beneficiary Unilateral Notice-Cancel Unilateral Notice',
  'B135 To Beneficiary Unilateral Notice-Cancel Unilateral Notice',
  'B136 To Registered Prop-Appn for RXN Against Land (Obj Notice)',
  'B136(CO)-To Regd Prop-Appn for RXN Against Land OBJ notice',
  'B136(HSS)-To Reg\'d Prop-Appn for RXN Against Land OBJ notice',
  'B136(LAA)-To Reg\'d Prop-Appn for RXN Against Land OBJ notice',
  'B136(TIB)-To Reg\'d Prop-Appn for RXN Against Land OBJ notice',
  'B137 To Registered Prop-Appn for RXN Against Land (Info Notice)',
  'B138 To Applicant of OS-RXN by Court Order-Priority Over OS',
  'B139 To cautioner - Appln may result in cancellation of caution',
  'B139A To Lord Chancellor cautioner - Ctn may be cancelled',
  'B140 To Interested Party-Determination of an Estate on Escheat',
  'B141 Notice of Appn for Alteration of Register',
  'B142 To Chargee-Appn for Alteration of Register',
  'B143 To Chargee-Alteration of Title',
  'B144 To Registered Prop-Form A RXN Entered',
  'B145 To Cautioner - application to cancel a caution',
  'B147 To Registered Prop-Form A RXN No-conflicting Information',
  'B148 To Reg\'d Prop-Appn to Register a Profit a Pendre in Gross',
  'B149 To Unreg\'d Owner-Adv Poss Appn Made',
  'B150 To Unreg\'d Chargee-Adv Poss Appn Made Free From Charge',
  'B151 To Owner of Unreg\'d Land-Appn for a Profit a Prendre in Gross',
  'B152 To Orig Applicant-Notice of Appn for an OC of Exempt info',
  'B153 To Reg\'d Prop-Crown Land-Determination of Estate on Escheat',
  'B154 To Reg\'d Prop-Crown Land-New Freehold Estate Following Escheat',
  'B155 To Interested Party-Crown Land-New Freehold Estate Following Escheat',
  'B156 To Reg\'d Prop-Appn to Enter Right to Determine Reg\'d Estate',
  'B157 To Chargee-Appn to Enter Right to Determine Regist\'d Estate',
  'B158 Appn to Remove Entry of Right to Determine Regist\'d Estate',
  'B159 Appn by Charge Creditor due to Foreclosure',
  'B160 To Beneficiary of Unilateral Notice-Trans Under Power of Sale',
  'B16-1 Notice of Adjoining Owner-Freehold',
  'B161 To Unreg\'d Chargee-Adv Poss Appn Made Subject to Charge',
  'B16-2 Notice to Adjoining Owner-Leasehold',
  'B162 To Registered Prop-Statutory Charge-Affects Whole',
  'B163 To Ctner of Charge-Appn to Register Maxi Amount',
  'B164 To Reg\'d Prop-Statutory Charge-Affects Part',
  'B165 To Reg\'d Chargee-Appn for a Profit a Prendre in Gross',
  'B166 To Chargee-Statutory Charge-Affects Whole',
  'B167 To Chargee-Statutory Charge-Affects Part',
  'B168 To Depositee-Statutory Charge-Affects Whole',
  'B169 To Depositee-Statutory Charge-Affects Part',
  'B170 To Unregistered Chargee-Appn for a Profit a Prendre in Gross',
  'B171 To Interest Party-Notice of a Ministerial Order',
  'B172 To Registered Prop-Notice of Ministerial Order',
  'B173 To Interest Party-Notice of Ministerial Order-Creating RC',
  'B174 To reg\'d chargee - claim to priority by statutory chargee',
  'B175 To reg\'d chargee - claim to priority by stat chargee (part)',
  'B176 Notice interested party - request for OC exempt info',
  'B177 Notice of Application to Register More than One Deed',
  'B178 Application to register restrictions against the land',
  'B179 To Chargee-Appn of an Order Under S.404 Companies Act 1985',
  'B180 To Chargee-Transfer-Housing (Defects) Act 1986',
  'B181 To Chargee-Transfer or Lease of Whole or Part-Housing Act 1985',
  'B182 To Stat Chargee-Transfer Under Power of Sale',
  'B183 To Registered Prop-Notice of Ministerial Order Creating RC',
  'B184 Power of Sale-Pre-emption Cancelled',
  'B186 Surrender of development rights u S.58(6) C &amp; LR Act 2002',
  'B187 Extinguishment of lease u S.7(3)(d) C &amp; LR Act 2002',
  'B188 Extinguishment of lease u S.9(3)(f) C &amp; LR Act 2002',
  'B189 To Reg\'d Prop of dominant title-POS Trans-cancel servient easement entry',
  'B191(A)-To Applicant-OBJ received from cautioner R221(5) LRR 2003',
  'B191(AR)-To Applicants\' Rep - OBJ rec\'d from cautioner R221(5) LRR 2003',
  'B192(C)-To Cautioner-After OBJ has been considered',
  'B192(CR)-To Cautioners\' Rep-After OBJ has been considered',
  'B193(A) To Applicants-OBJ received from objector S73 LRA2002',
  'B193(AR) To Applicants\' Rep-OBJ rec\'d from objector S73LRA2002',
  'B193(O) To Objector - On receipt of objection',
  'B193(OR) To Objectors\' Rep - On receipt of objection',
  'B194 To Ctnr-Appn to Register Personal Reps-Transmission',
  'B197 To Chargee-Apportionment of Rent-Ministerial Order',
  'B198 To Depositee-Apportionment of Rent-Ministerial Order',
  'B199 To Lessor-Application to Register a Lease',
  'B20 Registration of Foreshore',
  'B200 To Lessor - Apportionment of Rent in Lease by Stat Dec',
  'B201 To Chargee-Overriding Lease',
  'B202 To Rxnter-Transfer Under Power of Sale',
  'B204 Appn of a Charge Under the HSSS Adjudications Act 1983',
  'B205 To Lessor - Apportionment of rent in lease with consent',
  'B206 To Interested Parties - Cancel leasehold title on forfeiture',
  'B207 To Interested Parties - Cancel Unreg Lease or Close Register on Forfeiture',
  'B208 To Interested Parties-Cancel Noted Unreg Lease on Forfeiture',
  'B2-1 Application for Registration-Application Affects Land',
  'B210 To Cautioner-Appn to Upgrade the Title',
  'B211 To Reg\'d Prop Land or Charge-Compulsory Purchase (GVD)',
  'B212 To Reg\'d Prop Land or Charge-Compulsory Purchase (Deed Poll)',
  'B213 Appn to Close L\'hold Title (Determined by Notice)',
  'B215 Appn to Cancel Note of Unreg Lease from Lessor\'s Title',
  'B216 Notice of request for order under r.202 LRR 2003',
  'B2-2 Application for Registration-Application Affects Charge',
  'B224 Notice of proposed alteration of the register',
  'B225 Appn which may Result in Cancellation of N(I)D',
  'B226 - Notice of application to change a restriction',
  'B227 Notice to the Crown or Royal Duchy of an application for registration',
  'B229 Notice of cancellation of a restriction relating to a charge under s22(1)',
  'B230 Notice of cancellation of a restriction relating to a charge under s22(1)',
  'B231-1 Application to register restrictions against the land',
  'B232 Notice (LH) of determination of an estate on escheat',
  'B233 - Notice of application for change of name in the register',
  'B234 Notice of application for correction of name in the register',
  'B235 Notice of the proposed alteration of the register',
  'B236 Notice of an application in respect of an order under section 873 of the Companies Act 2006',
  'B237 Notice of an application to change an address for service',
  'B238 To Reg\'d Prop When Appn May Result in a Change of Address',
  'B239 Notice to HMRC',
  'B240 Notice to highway authority - Schedule 6 adverse possession application',
  'B241 Notice to highway authority - Schedule 12 adverse possession application',
  'B242 Notice to highway authority - FR adverse possession application',
  'B243 To Reg\'d Prop - executed under court order',
  'B244 To Registered Prop-Request for RXN Against Land (Info Notice)',
  'B245 Application to close registered leasehold title or enter notice following disclaimer',
  'B246 Application to cancel note of an unregistered lease or enter notice following disclaimer',
  'B247 Application for registration where there is a restriction in your favour (Right to Manage)',
  'B248 Registration of a restriction against the land - Asset of community value',
  'B249 Application to cancel a restriction - Asset of community value',
  'B25(PNP) Notice of an application to register mines and minerals - Part No powers of working',
  'B25(PPW) Notice of an application to register mines and minerals - Part powers of working',
  'B25(WNP) Notice of an application to register mines and minerals - Whole No powers of working',
  'B25(WPW) Notice of an application to register mines and minerals - Whole powers of working',
  'B250 Application for registration based on evidence where an original deed cannot be lodged',
  'B251 Application for registration',
  'B252 Notice of an application for registration - insolvency proceedings in the European Union',
  'B254 Notice of an application to close a registered leasehold title',
  'B255 Notice of an application to cancel notice of an unregistered lease',
  'B256 Cancellation of notice of lease - order for possession under the Housing Act 1988',
  'B257 Closure of a leasehold title - order for possession under the Housing Act 1988',
  'B258 Notice to regd prop of an application to change a qualified mines and minerals title to an absolute mines and minerals title',
  'B259 Notice to register charge (Social Svs and Well-being (Wales) Act 2014)',
  'B260 Notice of application to register determination of regstrd leasehold',
  'B261 Notice of registration of a bankruptcy notice and a bankruptcy restriction',
  'B28(PPW) Notice to a registered chargee of an application to register mines and minerals - Part powers of working',
  'B28(WNP) Notice to a registered chargee of an application to register mines and minerals - Whole no powers of working',
  'B28(WPW) Notice to a registered chargee of an application to register mines and minerals - Whole powers of working',
  'B29(NP) Notice of an application to register mines and minerals to an unregistered owner - No powers of working',
  'B29(PW) Notice of an application to register mines and minerals to an unregistered owner - Powers of working',
  'B3 Registration &amp; Change of Address',
  'B46 To Registered Prop-Legal Aid Charge',
  'B46A To Registered Chargee-Legal Aid sub-charge',
  'B5 To Reg\'d Prop When Appn May Result in a Change of Address',
  'B52 To a Commons Registration Authority-Appln for Regn',
  'B53-1 To Cautioner-Transfer Under Power of Sale',
  'B53-2 To Beneficiary of HR Notice-Cautioner Transfer Under Power of Sale',
  'B6 To Second Chargee-Transfer Under Power Of Sale',
  'B61 To Registered Prop-Severance of Joint Tenancy',
  'B62 To Reg\'d Prop-JP RXN appn by other than reg\'d prop',
  'B63 To Reg\'d Prop-JPRXN &amp; RXN appns by other than reg\'d prop',
  'B7 To Chargee-Appn to Discharge the Charge',
  'B73 To Registered Prop-Charge Under HSSSSA Act 1983',
  'B80 To Chargee-Bankruptcy Notice',
  'B81 To Chargee-Bankruptcy Restriction',
  'B93-1 To Bankruptcy Proprietor-SJT by Bankruptcy',
  'B93-2 To Bankrupts Co-owner-SJT by Bankruptcy',
  'B94-1 To Reg\'d Prop-HR',
  'B94-2 To Reg\'d Prop-HR-Court Order',
  'B94-3 To Reg\'d Prop-HR-Notice Renewal'
]

$(document).ready(function () {
if ($('#notices-typeahead-container').length > 0) {
  element = document.querySelector('#notices-typeahead-container')
  id = 'notices-typeahead' // To match it to the existing <label>.

  accessibleAutocomplete ({
    element: element,
    // defaultValue: element.getAttribute('data-default-value'),
    id: id,
    name: id,
    source: notices,
    minLength: 1
  })
}
})

// --------------------------------------------------
// /names-and-addresses - select checkboxes

const recipient_address_selector = '[id*="proprieters"]';

// Select all checkboxes
function checkAll (ele) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const recipients = document.querySelectorAll('.govuk-checkboxes__conditional');
  if (ele.checked) {
    Array.from(checkboxes).forEach(element => {
      element.checked = true;
      element.setAttribute('aria-expanded', true);
    });
    Array.from(recipients).forEach(element => {
      element.setAttribute('aria-expanded', true);
      // Expand recipient when checked.
      element.classList.remove('govuk-checkboxes__conditional--hidden');
    });
  } else {
    Array.from(checkboxes).forEach(element => {
      element.checked = false;
      element.setAttribute('aria-expanded', false);
    });
    Array.from(recipients).forEach(element => {
      element.setAttribute('aria-expanded', false);
      // Collapse recipient when checked.
      element.classList.add('govuk-checkboxes__conditional--hidden');
    });
  }
}

// Select proprietor's checkboxes.
function checkAddresses(ele) {
  // Only call this when a recipient is checked.
  const checkboxes = document.querySelectorAll(`#conditional-${ele.id} input[type="checkbox"]`);
  if (ele.checked) {
    Array.from(checkboxes).forEach(element => {
      element.checked = true;
    });
  } else {
    Array.from(checkboxes).forEach(element => {
      element.checked = false;
    });
  }
}

function addEventListenersFor(selector, func) {
  /** Add event listener for every item matching the given selector. */
  const selected_elements = document.querySelectorAll(selector);
  Array.from(selected_elements).forEach(function (element) {
    element.addEventListener('click', function () {
      func(this);
    });
  });
}

function init() {
  // Only run script on '/prod-new/names-and-addresses' page.
  relevant_paths = ['/prod-new/names-and-addresses'];
  if (!relevant_paths.includes(window.location.pathname)) {
    return;
  }
   // Add event listener to all checkboxes.
   if (document.getElementById('js-select-all') != null) {
    document.getElementById('js-select-all').addEventListener('click', function () {
      checkAll(this);
    });
  }
  // Add event listener to proprietor's checkboxes.
  addEventListenersFor(recipient_address_selector, checkAddresses);
}

function init() {
  // Only run script on '/prod-new/B13/names-and-addresses' page.
  relevant_paths = ['/prod-new/B13/names-and-addresses'];
  if (!relevant_paths.includes(window.location.pathname)) {
    return;
  }
   // Add event listener to all checkboxes.
   if (document.getElementById('js-select-all') != null) {
    document.getElementById('js-select-all').addEventListener('click', function () {
      checkAll(this);
    });
  }
  // Add event listener to proprietor's checkboxes.
  addEventListenersFor(recipient_address_selector, checkAddresses);
}

window.addEventListener('load', init);

// ==================================================
