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

// SSA v1.1
router.post('/how-to-add-titles', function (req, res) {
  const method = req.session.data['addMethod'];

  if (method === 'upload') {
    return res.redirect('/ssa/upload-a-spreadsheet-of-title-numbers');
  } else if (method === 'manual') {
    return res.redirect('/ssa/manage-titles-008-op-E');
  } else {
    return res.redirect('/how-to-add-titles'); // fallback if no option selected
  }
});


router.post('/upload-csv', function (req, res) {
  res.redirect('/ssa/manage-titles-008-op-C');
});


// SSA
// application about v4
router.post('/ssa/v4/4-application-about', function (req, res) {
  const applicationType = req.body['application-type'];
  switch (applicationType) {
    case 'change-of-ownership':
      res.redirect('/ssa/v4/5-1-transferring-whole-or-part');
      break;
    case 'updating-specific-title-details':
      res.redirect('/ssa/v4/5-2-confirm-updating-existing-title');
      break;
    case 'registering-lease':
      res.redirect('/ssa/v4/5-3-confirm-new-lease-term');
      break;
    case 'renewing-lease':
      res.redirect('/ssa/v4/5-4-confirm-renewing-existing-lease');
      break;
    case 'removal-of-restriction':
      req.session.data['selectedRoute'] = 'JP1';
      res.redirect('/ssa/v4/task-list');
      break;
    default:
      res.redirect('/ssa/v4/4-application-about');
  }
});

// follow-ups for each path
router.post('/ssa/v4/5-1-transferring-whole-or-part', function (req, res) {
  const transferType = req.body['transfer-type'];
  if (transferType === 'whole') {
    req.session.data['selectedRoute'] = 'RU';
  } else if (transferType === 'part') {
    req.session.data['selectedRoute'] = 'TP';
  }
  res.redirect('/ssa/v4/task-list');
});

router.post('/ssa/v4/5-2-confirm-updating-existing-title', function (req, res) {
  req.session.data['selectedRoute'] = 'RU';
  res.redirect('/ssa/v4/task-list');
});

router.post('/ssa/v4/5-3-confirm-new-lease-term', function (req, res) {
  req.session.data['selectedRoute'] = 'NL';
  res.redirect('/ssa/v4/task-list');
});

router.post('/ssa/v4/5-4-confirm-renewing-existing-lease', function (req, res) {
  req.session.data['selectedRoute'] = 'LE';
  res.redirect('/ssa/v4/task-list');
});

router.post('/ssa/v4/how-many-titles', function (req, res) {
  const count = req.body['title-count'];
  if (count === '1-25') {
    res.redirect('/ssa/v4/enter-title-numbers-non-ssa');
  } else if (count === '26-199') {
    res.redirect('/ssa/v4/enter-title-numbers');
  } else {
    res.redirect('/ssa/v4/how-many-titles'); // fallback if no option selected
  }
});

router.post('/ssa/v4/disclosable-overriding-interests', function (req, res) {
  const interest = req.body['overriding-interests'];

  // Optionally store the answer in session
  req.session.data['overriding-interests'] = interest;

  // Redirect regardless of Yes or No
  res.redirect('/ssa/v4/select-transactions');
});






// SSA Scenario's v4
// =====================

// Scenario 1: happy path
// ---------------------
router.post('/ssa/v4/s1/4-application-about', function (req, res) {
  const applicationType = req.body['application-type'];

  switch (applicationType) {
    case 'change-of-ownership':
      res.redirect('/ssa/v4/s1/5-1-transferring-whole-or-part');
      break;
    case 'updating-specific-title-details':
      res.redirect('/ssa/v4/s1/5-2-confirm-updating-existing-title');
      break;
    case 'registering-lease':
      res.redirect('/ssa/v4/s1/5-3-confirm-new-lease-term');
      break;
    case 'renewing-lease':
      res.redirect('/ssa/v4/s1/5-4-confirm-renewing-existing-lease');
      break;
    case 'removal-of-restriction':
      req.session.data['selectedRoute'] = 'JP1';
      res.redirect('/ssa/v4/s1/task-list');
      break;
    default:
      res.redirect('/ssa/v4/s1/4-application-about');
  }
});

router.post('/ssa/v4/s1/5-1-transferring-whole-or-part', function (req, res) {
  const transferType = req.body['transfer-type'];

  if (transferType === 'whole') {
    req.session.data['selectedRoute'] = 'RU';
  } else if (transferType === 'part') {
    req.session.data['selectedRoute'] = 'TP';
  }

  res.redirect('/ssa/v4/s1/task-list');
});

router.post('/ssa/v4/s1/how-many-titles', function (req, res) {
  const count = req.body['title-count'];

  if (count === '1-25') {
    res.redirect('/ssa/v4/s1/enter-title-numbers-non-ssa');
  } else if (count === '26-199') {
    res.redirect('/ssa/v4/s1/enter-title-numbers');
  } else {
    // fallback if nothing selected
    res.redirect('/ssa/v4/s1/how-many-titles');
  }
});

router.post('/ssa/v4/s1/disclosable-overriding-interests', function (req, res) {
  const interest = req.body['overriding-interests'];

  // Optionally store the answer in session
  req.session.data['overriding-interests'] = interest;

  // Redirect regardless of Yes or No
  res.redirect('/ssa/v4/s1/select-transactions');
});

// Scenario 2: too few titles
// ---------------------
router.post('/ssa/v4/s2/4-application-about', function (req, res) {
  const applicationType = req.body['application-type'];

  switch (applicationType) {
    case 'change-of-ownership':
      res.redirect('/ssa/v4/s2/5-1-transferring-whole-or-part');
      break;
    case 'updating-specific-title-details':
      res.redirect('/ssa/v4/s2/5-2-confirm-updating-existing-title');
      break;
    case 'registering-lease':
      res.redirect('/ssa/v4/s2/5-3-confirm-new-lease-term');
      break;
    case 'renewing-lease':
      res.redirect('/ssa/v4/s2/5-4-confirm-renewing-existing-lease');
      break;
    case 'removal-of-restriction':
      req.session.data['selectedRoute'] = 'JP1';
      res.redirect('/ssa/v4/s2/task-list');
      break;
    default:
      res.redirect('/ssa/v4/s2/4-application-about');
  }
});

router.post('/ssa/v4/s2/5-1-transferring-whole-or-part', function (req, res) {
  const transferType = req.body['transfer-type'];

  if (transferType === 'whole') {
    req.session.data['selectedRoute'] = 'RU';
  } else if (transferType === 'part') {
    req.session.data['selectedRoute'] = 'TP';
  }

  res.redirect('/ssa/v4/s2/task-list');
});

router.post('/ssa/v4/s2/how-many-titles', function (req, res) {
  const count = req.body['title-count'];

  if (count === '1-25') {
    res.redirect('/ssa/v4/s2/enter-title-numbers-non-ssa');
  } else if (count === '26-199') {
    res.redirect('/ssa/v4/s2/enter-title-numbers');
  } else {
    res.redirect('/ssa/v4/s2/how-many-titles');
  }
});

router.post('/ssa/v4/s2/remove-all-titles-confirm', function (req, res) {
  res.redirect('/ssa/v4/s2/enter-title-numbers');
});


// Scenario 3: some titles invalid
// -------------------------------
router.post('/ssa/v4/s3/4-application-about', function (req, res) {
  const applicationType = req.body['application-type'];

  switch (applicationType) {
    case 'change-of-ownership':
      res.redirect('/ssa/v4/s3/5-1-transferring-whole-or-part');
      break;
    case 'updating-specific-title-details':
      res.redirect('/ssa/v4/s3/5-2-confirm-updating-existing-title');
      break;
    case 'registering-lease':
      res.redirect('/ssa/v4/s3/5-3-confirm-new-lease-term');
      break;
    case 'renewing-lease':
      res.redirect('/ssa/v4/s3/5-4-confirm-renewing-existing-lease');
      break;
    case 'removal-of-restriction':
      req.session.data['selectedRoute'] = 'JP1';
      res.redirect('/ssa/v4/s3/task-list');
      break;
    default:
      res.redirect('/ssa/v4/s3/4-application-about');
  }
});

router.post('/ssa/v4/s3/5-1-transferring-whole-or-part', function (req, res) {
  const transferType = req.body['transfer-type'];

  if (transferType === 'whole') {
    req.session.data['selectedRoute'] = 'RU';
  } else if (transferType === 'part') {
    req.session.data['selectedRoute'] = 'TP';
  }

  res.redirect('/ssa/v4/s3/task-list');
});

router.post('/ssa/v4/s3/how-many-titles', function (req, res) {
  const count = req.body['title-count'];

  if (count === '1-25') {
    res.redirect('/ssa/v4/s3/enter-title-numbers-non-ssa');
  } else if (count === '26-199') {
    res.redirect('/ssa/v4/s3/enter-title-numbers');
  } else {
    res.redirect('/ssa/v4/s3/how-many-titles');
  }
});

router.post('/ssa/v4/s3/disclosable-overriding-interests', function (req, res) {
  const interest = req.body['overriding-interests'];
  req.session.data['overriding-interests'] = interest;
  res.redirect('/ssa/v4/s3/select-transactions');
});

router.post('/ssa/v4/s3/remove-all-titles-confirm', function (req, res) {
  res.redirect('/ssa/v4/s3/enter-title-numbers');
});


// Route to handle the form POST
router.post('/ssa/v4/s2/enter-title-numbers-non-ssa', function (req, res) {
  const titleNumbers = req.body['title-number'].trim()
  const titles = titleNumbers.split(/[,; ]+/).filter(Boolean)

  if (titles.length === 1) {
    req.session.data['single-title'] = titles[0]  // save to session
    res.redirect('/ssa/v4/s2/enter-title-numbers-non-ssa-added-1')
  } else {
    res.redirect('/ssa/v4/s2/enter-title-numbers-non-ssa-error')
  }
})


// SSA Scenario's v5
// =====================

// SSA S1 title list validation and routing
router.post('/ssa/v5/s1/enter-title-numbers', function (req, res) {
  const raw = req.body['title-numbers'] || ''
  const titles = raw
    .split(/[\n,;]+/)
    .map(t => t.trim())
    .filter(t => t.length > 0)

  const count = titles.length

  // Exact match for valid entry: 2, 6, or 26–199
  const isValid = count === 2 || count === 6 || (count >= 26 && count <= 199)

  if (!isValid) {
    return res.redirect('/ssa/v5/s1/enter-title-numbers-error-too-few')
  }

  // Save to session if needed: req.session.data['entered-titles'] = titles
  res.redirect('/ssa/v5/s1/manage-titles')
})

// SSA S2 title list validation and routing
router.post('/ssa/v5/s2/enter-title-numbers', function (req, res) {
  const raw = req.body['title-numbers'] || ''
  const titles = raw
    .split(/[\n,;]+/)
    .map(t => t.trim())
    .filter(t => t.length > 0)

  const count = titles.length
  const isValid = count === 2 || count === 6 || (count >= 26 && count <= 199)

  if (!isValid) {
    return res.render('ssa/v5/s2/enter-title-numbers-error-too-few', {
      data: { 'title-numbers': raw }
    })
  }

  res.redirect('/ssa/v5/s2/manage-titles')
})

// SSA S3 title list validation and routing
router.post('/ssa/v5/s3/enter-title-numbers', function (req, res) {
  const raw = req.body['title-numbers'] || ''
  const titles = raw
    .split(/[\n,;]+/)
    .map(t => t.trim())
    .filter(t => t.length > 0)

  const count = titles.length
  const isValid = count === 2 || count === 6 || (count >= 26 && count <= 199)

  if (!isValid) {
    return res.render('ssa/v5/s3/enter-title-numbers-error-too-few', {
      data: { 'title-numbers': raw }
    })
  }

  res.redirect('/ssa/v5/s3/manage-titles')
})



// Scenario 1: happy path
// ---------------------
router.post('/ssa/v5/s1/4-application-about', function (req, res) {
  const applicationType = req.body['application-type'];

  switch (applicationType) {
    case 'change-of-ownership':
      res.redirect('/ssa/v5/s1/5-1-transferring-whole-or-part');
      break;
    case 'updating-specific-title-details':
      res.redirect('/ssa/v5/s1/5-2-confirm-updating-existing-title');
      break;
    case 'registering-lease':
      res.redirect('/ssa/v5/s1/5-3-confirm-new-lease-term');
      break;
    case 'renewing-lease':
      res.redirect('/ssa/v5/s1/5-4-confirm-renewing-existing-lease');
      break;
    case 'removal-of-restriction':
      req.session.data['selectedRoute'] = 'JP1';
      res.redirect('/ssa/v5/s1/task-list');
      break;
    default:
      res.redirect('/ssa/v5/s1/4-application-about');
  }
});

router.post('/ssa/v5/s1/5-1-transferring-whole-or-part', function (req, res) {
  const transferType = req.body['transfer-type'];

  if (transferType === 'whole') {
    req.session.data['selectedRoute'] = 'RU';
  } else if (transferType === 'part') {
    req.session.data['selectedRoute'] = 'TP';
  }

  res.redirect('/ssa/v5/s1/task-list');
});

router.post('/ssa/v5/s1/how-many-titles', function (req, res) {
  const count = req.body['title-count'];

  if (count === '1-25') {
    res.redirect('/ssa/v5/s1/enter-title-numbers-non-ssa');
  } else if (count === '26-199') {
    res.redirect('/ssa/v5/s1/enter-title-numbers');
  } else {
    // fallback if nothing selected
    res.redirect('/ssa/v5/s1/how-many-titles');
  }
});

router.post('/ssa/v5/s1/disclosable-overriding-interests', function (req, res) {
  const interest = req.body['overriding-interests'];

  // Optionally store the answer in session
  req.session.data['overriding-interests'] = interest;

  // Redirect regardless of Yes or No
  res.redirect('/ssa/v5/s1/select-transactions');
});

// Scenario 2: too few titles
// ---------------------
router.post('/ssa/v5/s2/4-application-about', function (req, res) {
  const applicationType = req.body['application-type'];

  switch (applicationType) {
    case 'change-of-ownership':
      res.redirect('/ssa/v5/s2/5-1-transferring-whole-or-part');
      break;
    case 'updating-specific-title-details':
      res.redirect('/ssa/v5/s2/5-2-confirm-updating-existing-title');
      break;
    case 'registering-lease':
      res.redirect('/ssa/v5/s2/5-3-confirm-new-lease-term');
      break;
    case 'renewing-lease':
      res.redirect('/ssa/v5/s2/5-4-confirm-renewing-existing-lease');
      break;
    case 'removal-of-restriction':
      req.session.data['selectedRoute'] = 'JP1';
      res.redirect('/ssa/v5/s2/task-list');
      break;
    default:
      res.redirect('/ssa/v5/s2/4-application-about');
  }
});

router.post('/ssa/v5/s2/5-1-transferring-whole-or-part', function (req, res) {
  const transferType = req.body['transfer-type'];

  if (transferType === 'whole') {
    req.session.data['selectedRoute'] = 'RU';
  } else if (transferType === 'part') {
    req.session.data['selectedRoute'] = 'TP';
  }

  res.redirect('/ssa/v5/s2/task-list');
});

router.post('/ssa/v5/s2/how-many-titles', function (req, res) {
  const count = req.body['title-count'];

  if (count === '1-25') {
    res.redirect('/ssa/v5/s2/enter-title-numbers-non-ssa');
  } else if (count === '26-199') {
    res.redirect('/ssa/v5/s2/enter-title-numbers');
  } else {
    res.redirect('/ssa/v5/s2/how-many-titles');
  }
});

router.post('/ssa/v5/s2/remove-all-titles-confirm', function (req, res) {
  res.redirect('/ssa/v5/s2/enter-title-numbers');
});


// Scenario 3: some titles invalid
// -------------------------------
router.post('/ssa/v5/s3/4-application-about', function (req, res) {
  const applicationType = req.body['application-type'];

  switch (applicationType) {
    case 'change-of-ownership':
      res.redirect('/ssa/v5/s3/5-1-transferring-whole-or-part');
      break;
    case 'updating-specific-title-details':
      res.redirect('/ssa/v5/s3/5-2-confirm-updating-existing-title');
      break;
    case 'registering-lease':
      res.redirect('/ssa/v5/s3/5-3-confirm-new-lease-term');
      break;
    case 'renewing-lease':
      res.redirect('/ssa/v5/s3/5-4-confirm-renewing-existing-lease');
      break;
    case 'removal-of-restriction':
      req.session.data['selectedRoute'] = 'JP1';
      res.redirect('/ssa/v5/s3/task-list');
      break;
    default:
      res.redirect('/ssa/v5/s3/4-application-about');
  }
});

router.post('/ssa/v5/s3/5-1-transferring-whole-or-part', function (req, res) {
  const transferType = req.body['transfer-type'];

  if (transferType === 'whole') {
    req.session.data['selectedRoute'] = 'RU';
  } else if (transferType === 'part') {
    req.session.data['selectedRoute'] = 'TP';
  }

  res.redirect('/ssa/v5/s3/task-list');
});

router.post('/ssa/v5/s3/how-many-titles', function (req, res) {
  const count = req.body['title-count'];

  if (count === '1-25') {
    res.redirect('/ssa/v5/s3/enter-title-numbers-non-ssa');
  } else if (count === '26-199') {
    res.redirect('/ssa/v5/s3/enter-title-numbers');
  } else {
    res.redirect('/ssa/v5/s3/how-many-titles');
  }
});

router.post('/ssa/v5/s3/disclosable-overriding-interests', function (req, res) {
  const interest = req.body['overriding-interests'];
  req.session.data['overriding-interests'] = interest;
  res.redirect('/ssa/v5/s3/select-transactions');
});

router.post('/ssa/v5/s3/remove-all-titles-confirm', function (req, res) {
  res.redirect('/ssa/v5/s3/enter-title-numbers');
});


// Route to handle the form POST
router.post('/ssa/v5/s1/enter-title-numbers-non-ssa', function (req, res) {
  const titleNumbers = req.body['title-number'].trim()
  const titles = titleNumbers.split(/[,; ]+/).filter(Boolean)

  if (titles.length === 1) {
    req.session.data['single-title'] = titles[0]  // save to session
    res.redirect('/ssa/v5/s1/enter-title-numbers-non-ssa-added-1')
  } else {
    res.redirect('/ssa/v5/s1/enter-title-numbers-non-ssa-error')
  }
})

// Route to handle the form POST
router.post('/ssa/v5/s2/enter-title-numbers-non-ssa', function (req, res) {
  const titleNumbers = req.body['title-number'].trim()
  const titles = titleNumbers.split(/[,; ]+/).filter(Boolean)

  if (titles.length === 1) {
    req.session.data['single-title'] = titles[0]  // save to session
    res.redirect('/ssa/v5/s2/enter-title-numbers-non-ssa-added-1')
  } else {
    res.redirect('/ssa/v5/s2/enter-title-numbers-non-ssa-error')
  }
})

// Route to handle the form POST
router.post('/ssa/v5/s3/enter-title-numbers-non-ssa', function (req, res) {
  const titleNumbers = req.body['title-number'].trim()
  const titles = titleNumbers.split(/[,; ]+/).filter(Boolean)

  if (titles.length === 1) {
    req.session.data['single-title'] = titles[0]  // save to session
    res.redirect('/ssa/v5/s3/enter-title-numbers-non-ssa-added-1')
  } else {
    res.redirect('/ssa/v5/s3/enter-title-numbers-non-ssa-error')
  }
})

// ---------------------------------------------------------
// SSA v6 (S1) ROUTES
// ---------------------------------------------------------

// 1. Digital Registration Service start page
router.get('/ssa/v6/s1/1-digital-registration-service', function (req, res) {
  res.render('ssa/v6/s1/1-digital-registration-service');
});

// 2. Application reference
router.get('/ssa/v6/s1/2-application-reference', function (req, res) {
  res.render('ssa/v6/s1/2-application-reference');
});

router.post('/ssa/v6/s1/2-application-reference', function (req, res) {
  res.redirect('/ssa/v6/s1/3-are-you-a-conveyancer');
});

// 3. Are you a conveyancer
router.get('/ssa/v6/s1/3-are-you-a-conveyancer', function (req, res) {
  res.render('ssa/v6/s1/3-are-you-a-conveyancer');
});

router.post('/ssa/v6/s1/3-are-you-a-conveyancer', function (req, res) {
  res.redirect('/ssa/v6/s1/4-application-about');
});

// 4. What is the application about
router.get('/ssa/v6/s1/4-application-about', function (req, res) {
  res.render('ssa/v6/s1/4-application-about');
});

router.post('/ssa/v6/s1/4-application-about', function (req, res) {
  // Radio 1 routes to Whole or Part question
  res.redirect('/ssa/v6/s1/5-1-transferring-whole-or-part');
});

// 5. Whole or part
router.get('/ssa/v6/s1/5-1-transferring-whole-or-part', function (req, res) {
  res.render('ssa/v6/s1/5-1-transferring-whole-or-part');
});

router.post('/ssa/v6/s1/5-1-transferring-whole-or-part', function (req, res) {
  const answer = req.session.data['transfer-type']; // must match HTML

  console.log("User selected:", answer); // optional debug

  if (answer === 'part') {
    // Transfer of Part → NEW v6 SSA journey
    res.redirect('/ssa/v6/s1/task-list');
  } else if (answer === 'whole') {
    // Whole → OLD v5 SSA journey
    res.redirect('/ssa/v5/s1/task-list');
  } else {
    // No selection → stay on page (or add page-level validation later)
    res.redirect('/ssa/v6/s1/5-1-transferring-whole-or-part');
  }
});


// 6. Task List
router.get('/ssa/v6/s1/task-list', function (req, res) {
  res.render('ssa/v6/s1/task-list');
});

// 7. How many titles
router.post('/ssa/v6/s1/how-many-titles', function (req, res) {
  const count = req.session.data['title-count']; // must match HTML name

  if (count === '26-199') {
    // SSA route
    res.redirect('/ssa/v6/s1/enter-title-numbers');
  } else if (count === '1-25') {
    // non-SSA route
    res.redirect('/ssa/v6/s1/enter-title-numbers-non-ssa');
  } else {
    // no selection
    res.redirect('/ssa/v6/s1/how-many-titles');
  }
});


// 8. Enter title numbers (pasted list)
router.get('/ssa/v6/s1/enter-title-numbers', function (req, res) {
  res.render('ssa/v6/s1/enter-title-numbers');
});

router.post('/ssa/v6/s1/enter-title-numbers', function (req, res) {
  res.redirect('/ssa/v6/s1/manage-titles');
});

// 9. Manage titles (new version with validation)
router.get('/ssa/v6/s1/manage-titles', function (req, res) {
  res.render('ssa/v6/s1/manage-titles');
});

router.post('/ssa/v6/s1/manage-titles', function (req, res) {
  // Client-side JS manages validation; this just progresses
  res.redirect('/ssa/v6/s1/disclosable-overriding-interests');
});

// 10. Disclosable overriding interests
router.get('/ssa/v6/s1/disclosable-overriding-interests', function (req, res) {
  res.render('ssa/v6/s1/disclosable-overriding-interests');
});

router.post('/ssa/v6/s1/disclosable-overriding-interests', function (req, res) {
  res.redirect('/ssa/v6/s1/select-transactions');
});

// 11. Select transactions
router.get('/ssa/v6/s1/select-transactions', function (req, res) {
  res.render('ssa/v6/s1/select-transactions');
});


// ---------------------------------------------------------
// SSA v6b (S1) ROUTES (Variant B)
// ---------------------------------------------------------

router.get('/ssa/v6b/s1/1-digital-registration-service', function (req, res) {
  res.render('ssa/v6b/s1/1-digital-registration-service');
});

router.get('/ssa/v6b/s1/2-application-reference', function (req, res) {
  res.render('ssa/v6b/s1/2-application-reference');
});

router.post('/ssa/v6b/s1/2-application-reference', function (req, res) {
  res.redirect('/ssa/v6b/s1/3-are-you-a-conveyancer');
});

router.get('/ssa/v6b/s1/3-are-you-a-conveyancer', function (req, res) {
  res.render('ssa/v6b/s1/3-are-you-a-conveyancer');
});

router.post('/ssa/v6b/s1/3-are-you-a-conveyancer', function (req, res) {
  res.redirect('/ssa/v6b/s1/4-application-about');
});

router.get('/ssa/v6b/s1/4-application-about', function (req, res) {
  res.render('ssa/v6b/s1/4-application-about');
});

router.post('/ssa/v6b/s1/4-application-about', function (req, res) {
  res.redirect('/ssa/v6b/s1/5-1-transferring-whole-or-part');
});

router.get('/ssa/v6b/s1/5-1-transferring-whole-or-part', function (req, res) {
  res.render('ssa/v6b/s1/5-1-transferring-whole-or-part');
});

router.post('/ssa/v6b/s1/5-1-transferring-whole-or-part', function (req, res) {
  const answer = req.session.data['transfer-type']; // same field name is fine

  if (answer === 'part') {
    res.redirect('/ssa/v6b/s1/task-list');
  } else if (answer === 'whole') {
    // keep your existing behaviour: whole goes to v5 task list
    res.redirect('/ssa/v5/s1/task-list');
  } else {
    res.redirect('/ssa/v6b/s1/5-1-transferring-whole-or-part');
  }
});

router.get('/ssa/v6b/s1/task-list', function (req, res) {
  res.render('ssa/v6b/s1/task-list');
});

router.get('/ssa/v6b/s1/how-many-titles', function (req, res) {
  res.render('ssa/v6b/s1/how-many-titles');
});

router.post('/ssa/v6b/s1/how-many-titles', function (req, res) {
  const count = req.session.data['title-count'];

  if (count === '26-199') {
    res.redirect('/ssa/v6b/s1/enter-title-numbers');
  } else if (count === '1-25') {
    res.redirect('/ssa/v6b/s1/enter-title-numbers-non-ssa');
  } else {
    res.redirect('/ssa/v6b/s1/how-many-titles');
  }
});

router.get('/ssa/v6b/s1/enter-title-numbers', function (req, res) {
  res.render('ssa/v6b/s1/enter-title-numbers');
});

router.post('/ssa/v6b/s1/enter-title-numbers', function (req, res) {
  res.redirect('/ssa/v6b/s1/manage-titles');
});

router.get('/ssa/v6b/s1/manage-titles', function (req, res) {
  res.render('ssa/v6b/s1/manage-titles');
});

router.post('/ssa/v6b/s1/manage-titles', function (req, res) {
  res.redirect('/ssa/v6b/s1/disclosable-overriding-interests');
});

// ---------------------------------------------------------
// SEV - v-1-3 (below)
// ---------------------------------------------------------

// 2. Enter your reference
// Saves reference under both plain and protected sev_ key
router.post('/sev/v-1-3/2-enter-your-reference', function (req, res) {
  req.session.data['applicationReference'] = req.body['applicationReference']
  req.session.data['sev_applicationReference'] = req.body['applicationReference']
  res.redirect('/sev/v-1-3/3-are-you-a-conveyancer')
})

// 3. Are you a conveyancer?
// Yes -> continue to developer application check
// No -> placeholder non-conveyancer branch (404 for now)
router.post('/sev/v-1-3/3-are-you-a-conveyancer', function (req, res) {
  const conveyancer = req.body['conveyancer']
  req.session.data['conveyancer'] = conveyancer
  req.session.data['sev_applicationReference'] = req.body['sev_applicationReference']  // ADD
  if (conveyancer === 'yes') { res.redirect('/sev/v-1-3/4-is-this-a-developer-application') }
  else if (conveyancer === 'no') { res.redirect('/404') }
  else { res.redirect('/sev/v-1-3/3-are-you-a-conveyancer') }
})

// 4. Is this a developer application?
// No branching logic - always continues to next page
router.post('/sev/v-1-3/4-is-this-a-developer-application', function (req, res) {
  req.session.data['developerApplication'] = req.body['developerApplication']
  req.session.data['sev_applicationReference'] = req.body['sev_applicationReference']  // ADD
  res.redirect('/sev/v-1-3/5-tell-us-what-your-application-is-about')
})

// 5. Tell us what your application is about
// SEV radio -> eligibility check
// Anything else -> 404 for now
router.post('/sev/v-1-3/5-tell-us-what-your-application-is-about', function (req, res) {
  const applicationType = req.body['application-type']
  req.session.data['application-type'] = applicationType
  req.session.data['sev_applicationReference'] = req.body['sev_applicationReference']  // ADD
  switch (applicationType) {
    case 'single-transaction-application-severance-of-joint-tenancy':
      res.redirect('/sev/v-1-3/6-check-if-you-can-use-this-application-type'); break
    default: res.redirect('/404'); break
  }
})

// 6. Check if you can use this application type
// DP: all eligibility answers Yes -> Enter title number
// DP: any answer No -> You cannot continue with this application
router.post('/sev/v-1-3/6-check-if-you-can-use-this-application-type', function (req, res) {
  const singleTitle = req.body['singleTitle']
  const multipleProprietors = req.body['multipleProprietors']
  req.session.data['singleTitle'] = singleTitle
  req.session.data['multipleProprietors'] = multipleProprietors
  req.session.data['sev_applicationReference'] = req.body['sev_applicationReference']  // ADD
  if (singleTitle === 'yes' && multipleProprietors === 'yes') {
    res.redirect('/sev/v-1-3/7-enter-title-number')
  } else {
    res.redirect('/sev/v-1-3/6a-you-cannot-continue-with-this-application')
  }
})

// 7. Enter title number
// Saves title number under both plain and protected sev_ key
// DP: accepted titles (DN100, DN200, DN300) -> Title details
// DP: anything else -> post-check failure page
router.post('/sev/v-1-3/7-enter-title-number', function (req, res) {
  const titleNumberRaw = req.body['titleNumber'] || ''
  const titleNumber = titleNumberRaw.trim().toUpperCase()

  req.session.data['titleNumber'] = titleNumber
  req.session.data['sev_titleNumber'] = titleNumber
  req.session.data['sev_applicationReference'] = req.body['sev_applicationReference']  // ADD THIS

  const acceptedTitles = ['DN100', 'DN200', 'DN300']

  if (!acceptedTitles.includes(titleNumber)) {
    return res.redirect('/sev/v-1-3/you-cannot-apply-online-for-severance-of-joint-tenancy-variant-b-post-check-failure')
  }

  return res.redirect('/sev/v-1-3/8-title-details')
})

// 8. Title details
// No branching - always continues to task list
router.post('/sev/v-1-3/8-title-details', function (req, res) {
  req.session.data['sev_applicationReference'] = req.body['sev_applicationReference']
  req.session.data['sev_titleNumber'] = req.body['sev_titleNumber']
  res.redirect('/sev/v-1-3/9-task-list-transaction-details')
})

// 9. Task list - transaction details - Continue button POST
// Re-saves sev_ protected values so the Kit cannot wipe them
// Always continues to registered proprietors
router.post('/sev/v-1-3/9-task-list-transaction-details-continue', function (req, res) {
  req.session.data['sev_applicationReference'] = req.body['sev_applicationReference']
  req.session.data['sev_titleNumber'] = req.body['sev_titleNumber']
  res.redirect('/sev/v-1-3/10-registered-proprietors')
})

// 10. Registered proprietors
// Saves representative flag under both plain and protected sev_ key
// Re-saves sev_ reference and title number so they survive this POST
// DP: representative applying Yes -> skip who is applying, go straight to certification (all proprietors variant)
// DP: representative applying No -> Who is applying
router.post('/sev/v-1-3/10-registered-proprietors', function (req, res) {
  const representativeApplying = req.body['representativeApplying']

  req.session.data['representativeApplying'] = representativeApplying
  req.session.data['sev_representativeApplying'] = representativeApplying
  req.session.data['sev_applicationReference'] = req.body['sev_applicationReference']
  req.session.data['sev_titleNumber'] = req.body['sev_titleNumber']

  if (representativeApplying === 'yes') {
    return res.redirect('/sev/v-1-3/12-conveyancer-documents-certified-variant-all-registered-proprietors-are-applying')
  }

  if (representativeApplying === 'no') {
    return res.redirect('/sev/v-1-3/11-who-is-applying')
  }

  return res.redirect('/sev/v-1-3/10-registered-proprietors')
})

// 11. Who is applying - GET
router.get('/sev/v-1-3/11-who-is-applying', function (req, res) {
  res.render('sev/v-1-3/11-who-is-applying')
})

// 11. Who is applying - POST
// Filters _unchecked values injected by the Kit (see GOV.UK Prototype Kit bug notes)
// Re-saves sev_ reference and title number so they survive this POST
// DP: 0 selected -> stay on page (error state)
// DP: 2 selected (all proprietors) -> certification variant all
// DP: 1 selected (partial) -> certification variant not-all
router.post('/sev/v-1-3/11-who-is-applying', function (req, res) {
  let raw = req.body['applicants']
  const selected = (Array.isArray(raw) ? raw : raw ? [raw] : [])
    .filter(v => v !== '' && v !== null && v !== undefined && v !== '_unchecked')

  req.session.data['applicants'] = selected
  req.session.data['applicantsError'] = selected.length === 0
  req.session.data['sev_applicationReference'] = req.body['sev_applicationReference']
  req.session.data['sev_titleNumber'] = req.body['sev_titleNumber']

  if (selected.length === 0) {
    return res.redirect('/sev/v-1-3/11-who-is-applying')
  }

  if (selected.length >= 2) {
    return res.redirect('/sev/v-1-3/12-conveyancer-documents-certified-variant-all-registered-proprietors-are-applying')
  }

  return res.redirect('/sev/v-1-3/12b-conveyancer-documents-certified-variant-not-all-registered-proprietors-are-applying')
})

// 12. Conveyancer documents certified - all registered proprietors are applying
// Reads representative flag from req.body (hidden field on page, not session)
// Re-saves all sev_ protected values so they survive this POST
// DP: representative applying Yes -> documents required task list
// DP: representative applying No -> documents optional task list
router.post('/sev/v-1-3/12-conveyancer-documents-certified-variant-all-registered-proprietors-are-applying', function (req, res) {
  req.session.data['conveyancerCertifiedAll'] = req.body['conveyancerCertifiedAll']

  const representativeApplying = req.body['sev_representativeApplying']
  req.session.data['sev_representativeApplying'] = representativeApplying
  req.session.data['sev_applicationReference'] = req.body['sev_applicationReference']
  req.session.data['sev_titleNumber'] = req.body['sev_titleNumber']

  if (representativeApplying === 'yes') {
    return res.redirect('/sev/v-1-3/13-task-list-variant-documents-required')
  }

  return res.redirect('/sev/v-1-3/13-task-list-variant-documents-optional')
})

// 12b. Conveyancer documents certified - not all registered proprietors are applying
// Reads representative flag from req.body (hidden field on page, not session)
// Re-saves all sev_ protected values so they survive this POST
// DP: representative applying Yes -> documents required task list
// DP: representative applying No -> documents optional task list
router.post('/sev/v-1-3/12b-conveyancer-documents-certified-variant-not-all-registered-proprietors-are-applying', function (req, res) {
  req.session.data['conveyancerCertifiedNotAll'] = req.body['conveyancerCertifiedNotAll']

  const representativeApplying = req.body['sev_representativeApplying']
  req.session.data['sev_representativeApplying'] = representativeApplying
  req.session.data['sev_applicationReference'] = req.body['sev_applicationReference']
  req.session.data['sev_titleNumber'] = req.body['sev_titleNumber']

  if (representativeApplying === 'yes') {
    return res.redirect('/sev/v-1-3/13-task-list-variant-documents-required')
  }

  return res.redirect('/sev/v-1-3/13-task-list-variant-documents-optional')
})

// 13. Task list - documents optional - Continue button POST
// Re-saves sev_ protected values so the Kit cannot wipe them
// Always continues to attach documents optional question
router.post('/sev/v-1-3/13-task-list-variant-documents-optional-continue', function (req, res) {
  req.session.data['sev_applicationReference'] = req.body['sev_applicationReference']
  req.session.data['sev_titleNumber'] = req.body['sev_titleNumber']
  res.redirect('/sev/v-1-3/14-attach-documents-optional-question')
})

// 13. Task list - documents required - Continue / Review button POST
router.post('/sev/v-1-3/13-task-list-variant-documents-required-continue', function (req, res) {
  req.session.data['sev_applicationReference'] = req.body['sev_applicationReference']
  req.session.data['sev_titleNumber'] = req.body['sev_titleNumber']
  req.session.data['applicationReference'] = req.body['sev_applicationReference']
  req.session.data['titleNumber'] = req.body['sev_titleNumber']
  req.session.data['requiredDocumentFileName'] = req.body['sev_requiredDocumentFileName']
  req.session.data['requiredDocumentCertification'] = req.body['sev_requiredDocumentCertification']
  return res.redirect('/sev/v-1-3/16b-review-your-application-documents-required')
})

// 14. Attach documents optional question
// Re-saves sev_ protected values so they survive this POST
// DP: Yes -> attach documents page
// DP: No -> task list (documents not required state)
router.post('/sev/v-1-3/14-attach-documents-optional-question', function (req, res) {
  const attachDocumentsOptionalChoice = req.body['attachDocumentsOptionalChoice']
  req.session.data['attachDocumentsOptionalChoice'] = attachDocumentsOptionalChoice
  req.session.data['sev_applicationReference'] = req.body['sev_applicationReference']
  req.session.data['sev_titleNumber'] = req.body['sev_titleNumber']

  if (attachDocumentsOptionalChoice === 'yes') {
    return res.redirect('/sev/v-1-3/14b-attach-documents-optional')
  }

  if (attachDocumentsOptionalChoice === 'no') {
    return res.redirect('/sev/v-1-3/15-task-list-variant-documents-not-required')
  }

  return res.redirect('/sev/v-1-3/14-attach-documents-optional-question')
})

// 14b. Attach documents optional - POST
// Carries document file name and certification forward via hidden fields
// Re-saves sev_ protected values so they survive this POST
// Always returns to task list (documents not required state)
router.post('/sev/v-1-3/14b-attach-documents-optional', function (req, res) {
  req.session.data['optionalDocumentFileName'] = req.body['sev_optionalDocumentFileName']
  req.session.data['optionalDocumentCertification'] = req.body['sev_optionalDocumentCertification']
  req.session.data['sev_applicationReference'] = req.body['sev_applicationReference']
  req.session.data['sev_titleNumber'] = req.body['sev_titleNumber']
  return res.redirect('/sev/v-1-3/15-task-list-variant-documents-not-required')
})

// 14b. Attach documents required - POST
router.post('/sev/v-1-3/14b-attach-documents-required', function (req, res) {
  req.session.data['requiredDocumentFileName'] = req.body['sev_requiredDocumentFileName']
  req.session.data['requiredDocumentCertification'] = req.body['sev_requiredDocumentCertification']
  req.session.data['sev_applicationReference'] = req.body['sev_applicationReference']
  req.session.data['sev_titleNumber'] = req.body['sev_titleNumber']
  return res.redirect('/sev/v-1-3/13-task-list-variant-documents-required')
})

// 14c. Attach and certify document - GET
router.get('/sev/v-1-3/14-c-attach-and-certify-document', function (req, res) {
  res.render('sev/v-1-3/14-c-attach-and-certify-document')
})

// 14c. Attach and certify document - POST
// Saves file name captured by JS on the page and certification choice
// Always returns to attach documents optional table
router.post('/sev/v-1-3/14-c-attach-and-certify-document', function (req, res) {
  req.session.data['optionalDocumentFileName'] = req.body['optionalDocumentFileName']
  req.session.data['optionalDocumentCertification'] = req.body['optionalDocumentCertification']
  return res.redirect('/sev/v-1-3/14b-attach-documents-optional')
})

// 14c required. Attach and certify document (required variant) - GET + POST
router.get('/sev/v-1-3/14-c-attach-and-certify-document-required', function (req, res) {
  res.render('sev/v-1-3/14-c-attach-and-certify-document-required')
})

router.post('/sev/v-1-3/14-c-attach-and-certify-document-required', function (req, res) {
  req.session.data['requiredDocumentFileName'] = req.body['requiredDocumentFileName']
  req.session.data['requiredDocumentCertification'] = req.body['requiredDocumentCertification']
  return res.redirect('/sev/v-1-3/14b-attach-documents-required')
})

// 15. Task list - documents not required - Continue button POST
// Re-saves all sev_ protected values and document values so the Kit cannot wipe them
// Always continues to review page
router.post('/sev/v-1-3/15-task-list-variant-documents-not-required', function (req, res) {
  req.session.data['sev_applicationReference'] = req.body['sev_applicationReference']
  req.session.data['sev_titleNumber'] = req.body['sev_titleNumber']
  req.session.data['applicationReference'] = req.body['sev_applicationReference']
  req.session.data['titleNumber'] = req.body['sev_titleNumber']
  req.session.data['optionalDocumentFileName'] = req.body['sev_optionalDocumentFileName']
  req.session.data['optionalDocumentCertification'] = req.body['sev_optionalDocumentCertification']
  return res.redirect('/sev/v-1-3/16-review-your-application-documents-optional')
})

// 16b. Review your application - documents required - POST (Confirm and submit)
router.post('/sev/v-1-3/16b-review-your-application-documents-required', function (req, res) {
  return res.redirect('/sev/v-1-3/17-confirmation')
})

module.exports = router;
