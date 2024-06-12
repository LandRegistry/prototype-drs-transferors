//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// * Scenario - 1 *

// GET request for Amend Name page
router.get('/s1/amend-transferor-private-individual-name', function (req, res) {
  var transferorId = req.query.transferor;
  // Render the Amend Name page with the transferorId
  res.render('s1/amend-transferor-private-individual-name', { 'transferorId': transferorId });
});

// POST request for handling the form submission on Amend Name page
router.post('/s1/amend-transferor-private-individual-name', function (req, res) {
  var transferorId = req.query.transferor;
  var forenames = req.body.forenames;
  var surname = req.body.surname;

  // Update the appropriate transferor's name based on transferorId
  if (transferorId === '1') {
    req.session.data['transferor1Name'] = forenames + ' ' + surname;
  } else if (transferorId === '2') {
    req.session.data['transferor2Name'] = forenames + ' ' + surname;
  }

  // Redirect back to the review page
  res.redirect('/s1/review-transferor-details-tor-2');
});

// Save transferor 1
router.post('/save-transferor-1-1', (req, res) => {
    var transferorName = req.body.forenames + ' ' + req.body.surname;
    req.session.data['transferorName'] = transferorName;
    res.redirect('/s1/select-capacity-1');
});

// Save capacity for transferor 1
router.post('/save-capacity-1', (req, res) => {
    var capacity = req.body.capacity;
    req.session.data['capacity'] = capacity;
    res.redirect('/s1/review-transferor-details-mat-1');
});

// Save transferor (trustee)
router.post('/save-trustee', (req, res) => {
  const name = req.body.forenames + ' ' + req.body.surname;
  req.session.data['trusteeName'] = name;
  res.redirect('/s1/review-transferor-details-tor-1-mat-1');

});

// Amend trustee name
router.post('/s1/amend-trustee-name', function (req, res) {
  var forenames = req.body.forenames;
  var surname = req.body.surname;
  req.session.data['trusteeName'] = forenames + ' ' + surname;
  res.redirect('/s1/review-transferor-details-tor-1-mat-1');
});

// * Scenario - 2 *

// Save transferor 1 (trustee)
router.post('/save-new-proprietor', (req, res) => {
  const name = req.body.forenames + ' ' + req.body.surname;
  req.session.data['newProprietorName'] = name;
  res.redirect('/s2/review-transferor-details-mat-1');

});

// Save transferor 2
router.post('/save-transferor-2', (req, res) => {
  const name = req.body.forenames + ' ' + req.body.surname;
  req.session.data['transferor2-2Name'] = name;
  res.redirect('/s2/select-capacity-1');

});

// Save capacity for transferor 2
router.post('/save-capacity-2', (req, res) => {
    var capacity = req.body.capacity;
    req.session.data['capacity'] = capacity;
    res.redirect('/s2/review-transferor-details-mat-2');
});

// Add attorney name 1
router.post('/s2/add-attorney-name-1', function (req, res) {
  var forenames = req.body.forenames;
  var surname = req.body.surname;
  req.session.data['attorneyName-1'] = forenames + ' ' + surname;
  res.redirect('/s2/review-transferor-details-mat-2-attorney-1');
});

// Add attorney name 2
router.post('/s2/add-attorney-name-2', function (req, res) {
  var forenames = req.body.forenames;
  var surname = req.body.surname;
  req.session.data['attorneyName-2'] = forenames + ' ' + surname;
  res.redirect('/s2/review-transferor-details-mat-2-attorney-2');
});




// v2.9

// Save transferor 1 name for v2s1 (e.g., Jane Jenkins)

router.post('/save-transferor-name-v2s1-1', (req, res) => {
  const name = `${req.body.forenames} ${req.body.surname}`;
  console.log(name); // add this
  req.session.data['transferorV2s1Name'] = name;
  res.redirect('/v2s1/select-capacity-at-ap-1');  
});


// Save capacity for transferor 1 for v2s1
router.post('/save-transferor-capacity-v2s1-1', (req, res) => {
    var capacity = req.body.capacity;
    req.session.data['transferor-capacity-v2s1-1'] = capacity;
    res.redirect('/v2s1/confirm-acting-for');
});


// Save transferor 2 name for v2s1 (e.g., Duncan James)
router.post('/save-transferor-name-v2s1-2', (req, res) => {
    const transferorName = `${req.body.forenames} ${req.body.surname}`;
    req.session.data['transferor-name-v2s1-2'] = transferorName;
    res.redirect('/v2s1/select-capacity-at-ap-2');
});

// Save capacity for transferor 2 for v2s1
router.post('/save-capacity-v2s1-2', (req, res) => {
    const capacity = req.body.capacity;
    req.session.data['capacity-v2s1-2'] = capacity;
    res.redirect('/v2s1/confirm-acting-for-2');
});

// Amend unique trustee name
router.post('/v2s1/amend-unique-trustee-name', function (req, res) {
  var forenames = req.body.forenames;
  var surname = req.body.surname;
  req.session.data['transferorNameV2-1-2'] = forenames + ' ' + surname;
  res.redirect('/v2s1/review-transferor-details-tor-1-mat-1');
});

// * Scenario - 2 *

// Save transferor 1
router.post('/save-new-proprietor-v2', (req, res) => {
  const name = req.body.forenames + ' ' + req.body.surname;
  req.session.data['newProprietorName2'] = name;
  res.redirect('/v2s2/review-transferor-details-mat-1');

});

// Save transferor 2
router.post('/save-transferor-v2-2-2', (req, res) => {
    var transferorName = req.body.forenames + ' ' + req.body.surname;
    req.session.data['transferorNameV2-2-2'] = transferorName;
    res.redirect('/v2s2/select-capacity-np-at-ap-1'); // Ensure this path is unique for transferor 2
});

// Add attorney name 1
router.post('/v2s2/add-attorney-name-1', function (req, res) {
  var forenames = req.body.forenames;
  var surname = req.body.surname;
  req.session.data['attorneyName-v2'] = forenames + ' ' + surname;
  res.redirect('/v2s2/review-transferor-details-mat-2-attorney-1');
});


// application about v1.6b
router.post('/application-about/v1-6b/route', function (req, res) {
  const applicationType = req.body['application-type'];
  switch (applicationType) {
    case 'change-of-ownership':
      res.redirect('/application-about/v1-6b/transferring-whole-or-part');
      break;
    case 'updating-specific-title-details':
      res.redirect('/application-about/v1-6b/confirm-updating-existing-title');
      break;
    case 'registering-lease':
      res.redirect('/application-about/v1-6b/confirm-new-lease-term');
      break;
    case 'renewing-lease':
      res.redirect('/application-about/v1-6b/confirm-renewing-existing-lease');
      break;
    case 'removal-of-restriction':
      req.session.data['selectedRoute'] = 'JP1';
      res.redirect('/application-about/v1-6b/task-list');
      break;
    default:
      res.redirect('/application-about/v1-6b');
  }
});

router.post('/application-about/v1-6b/transferring-whole-or-part', function (req, res) {
  const transferType = req.body['transfer-type'];
  if (transferType === 'whole') {
    req.session.data['selectedRoute'] = 'RU';
  } else if (transferType === 'part') {
    req.session.data['selectedRoute'] = 'TP';
  }
  res.redirect('/application-about/v1-6b/task-list');
});

router.post('/application-about/v1-6b/confirm-updating-existing-title', function (req, res) {
  req.session.data['selectedRoute'] = 'RU';
  res.redirect('/application-about/v1-6b/task-list');
});

router.post('/application-about/v1-6b/confirm-new-lease-term', function (req, res) {
  req.session.data['selectedRoute'] = 'NL';
  res.redirect('/application-about/v1-6b/task-list');
});

router.post('/application-about/v1-6b/confirm-renewing-existing-lease', function (req, res) {
  req.session.data['selectedRoute'] = 'LE';
  res.redirect('/application-about/v1-6b/task-list');
});


// application about v1.3

router.post('/application-about/v1-3/route', function (req, res) {
  const applicationType = req.body['application-type'];

  switch (applicationType) {
    case 'change-of-ownership':
      res.redirect('/application-about/v1-3/transferring-whole-or-part');
      break;
    case 'updating-specific-title-details':
      res.redirect('/application-about/v1-3/confirm-updating-existing-title');
      break;
    case 'registering-lease':
      res.redirect('/application-about/v1-3/confirm-new-lease-term');
      break;
    case 'renewing-lease':
      res.redirect('/application-about/v1-3/confirm-renewing-existing-lease');
      break;
    case 'removal-of-restriction':
      req.session.data['selectedRoute'] = 'JP1';
      res.redirect('/application-about/v1-3/task-list');
      break;
    default:
      res.redirect('/application-about/v1-3');
  }
});

router.post('/application-about/v1-3/transferring-whole-or-part', function (req, res) {
  const transferType = req.body['transfer-type'];

  if (transferType === 'whole') {
    req.session.data['selectedRoute'] = 'RU';
  } else if (transferType === 'part') {
    req.session.data['selectedRoute'] = 'TP';
  }

  res.redirect('/application-about/v1-3/task-list');
});

router.post('/application-about/v1-3/confirm-updating-existing-title', function (req, res) {
  req.session.data['selectedRoute'] = 'RU';
  res.redirect('/application-about/v1-3/task-list');
});

router.post('/application-about/v1-3/confirm-new-lease-term', function (req, res) {
  req.session.data['selectedRoute'] = 'NL';
  res.redirect('/application-about/v1-3/task-list');
});

router.post('/application-about/v1-3/confirm-renewing-existing-lease', function (req, res) {
  req.session.data['selectedRoute'] = 'LE';
  res.redirect('/application-about/v1-3/task-list');
});


// application about v2.2

router.post('/application-about/v1-2/route', function (req, res) {
  const applicationType = req.body['application-type'];

  switch (applicationType) {
    case 'change-of-ownership':
      res.redirect('/application-about/v1-2/transferring-whole-or-part');
      break;
    case 'no-change-of-ownership':
      res.redirect('/application-about/v1-2/register-new-lease');
      break;
    case 'removal-of-restriction':
      req.session.data['selectedRoute'] = 'JP1';
      res.redirect('/application-about/v1-2/task-list');
      break;
    default:
      res.redirect('/application-about/v1-2');
  }
});

router.post('/application-about/v1-2/transferring-whole-or-part', function (req, res) {
  const transferType = req.body['transfer-type'];

  if (transferType === 'whole') {
    req.session.data['selectedRoute'] = 'RU';
    res.redirect('/application-about/v1-2/task-list');
  } else if (transferType === 'part') {
    req.session.data['selectedRoute'] = 'TP';
    res.redirect('/application-about/v1-2/task-list');
  } else {
    res.redirect('/application-about/v1-2/transferring-whole-or-part');
  }
});

router.post('/application-about/v1-2/register-new-lease', function (req, res) {
  const registerNewLease = req.body['register-new-lease'];

  if (registerNewLease === 'yes') {
    res.redirect('/application-about/v1-2/renewing-lease');
  } else if (registerNewLease === 'no') {
    req.session.data['selectedRoute'] = 'RU';
    res.redirect('/application-about/v1-2/task-list');
  } else {
    res.redirect('/application-about/v1-2/register-new-lease');
  }
});

router.post('/application-about/v1-2/renewing-lease', function (req, res) {
  const renewingLease = req.body['renewing-lease'];

  if (renewingLease === 'yes') {
    req.session.data['selectedRoute'] = 'LE';
    res.redirect('/application-about/v1-2/task-list');
  } else if (renewingLease === 'no') {
    req.session.data['selectedRoute'] = 'NL';
    res.redirect('/application-about/v1-2/task-list');
  } else {
    res.redirect('/application-about/v1-2/renewing-lease');
  }
});

module.exports = router;
