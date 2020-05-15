const generatePolicy = (
  principalId: string,
  effect: string,
  resource: string
) => {
  var authResponse: any = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    var policyDocument: any = {};
    policyDocument.Version = "2012-10-17"; // default version
    policyDocument.Statement = [];
    var statementOne: any = {};
    statementOne.Action = "execute-api:Invoke"; // default action
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

export const generateAllow = (resource: string) => {
  return generatePolicy("user", "Allow", resource);
};

export const generateDeny = (resource: string) => {
  return generatePolicy("user", "Deny", resource);
};
