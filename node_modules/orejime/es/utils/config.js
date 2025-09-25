export function getPurposes(config) {
  var purposes = new Set([]);

  for (var i = 0; i < config.apps.length; i++) {
    var appPurposes = config.apps[i].purposes || [];

    for (var j = 0; j < appPurposes.length; j++) {
      purposes.add(appPurposes[j]);
    }
  }

  return Array.from(purposes);
}