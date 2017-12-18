
function getAppConfig() {
    const end_point = process.env.NODE_ENV !== 'production' ? 'http://0.0.0.0:3000/api' : 'https://stormy-earth-34581.herokuapp.com/api';
    return {
        end_point,
        api_version: "v1",
        public_key: "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0NCk1JR2ZNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0R05BRENCaVFLQmdRRExKbEtVQUVIYWtNMEUyTEFTL3d5S2MwZXMNCkFuV3JSWUgzQWZJR25mb2FnUDlsa2dhZHVDRGMxT0M4UWl4WVlTc3JGK3FjbWJjNTVSaStDN3dtdW9jankzZ1QNCnVEWkJhN1duUk9hMWErUmpiUzVGNTl0L3FQeHBHMEdaVGwwVGxNUjZWdGhCVTEyQ0FCTGlTUnZOTm9FSktDNlENCjh4Y2hLTkwrSjh0azdYVm8wUUlEQVFBQg0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tDQo=",
    };
}

export default getAppConfig();
