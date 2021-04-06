/*module.exports={
    googleProjectID: 'skyassist-bagsearch-agent-mxce',
    dialogFlowSessionID:'react-bot-session',
    dialogFlowSessionLanguageCode:'en-US',
    googleClientEmail:'dialogflow-wvegcj@skyassist-bagsearch-agent-mxce.iam.gserviceaccount.com',
    googlePrivateKey:'-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCvEZYJHDD/3GNj\n7ec1x4C6YXx4GRZYoEK2mEHXN0T1VB8PRRfLNtZkgCTp+HK0EK/2mB/v1BfPEMR2\nhLrWLY7xdrz2i0gGeU7ScdRIRVCuTw+H9C4l5yX+lMwhHC+mHQMO/NdrmsVTULP6\nCXvBUadL58H0TIUJptygWUDGOCLHHcD+QGtRC9sq+qEYv5YOLmNGnkZ+P8Qn5oZ9\nhUW+CVjJ6GMp3kA8l4VIBoQT333H/lIQBMXxqH3vvFQ7SGlMvPZAn5WDQqXRGNaW\nCnw/v9q9pySzIqhBIKP727c0GvhWCHbxkdddOu/rdVTR86KGQI3vm2yBEKIBHIc3\n2Mv8l6LBAgMBAAECggEAKjTbLycUyRqg+56Hd3e5mTWXhHzH3mYEr3DVrsUsYtj9\nA/lsWxnFZkVeoOm8/ZxoT9MtH+zKMKmiM9CcGraxF5XAyM+bdbQZRLMcsq/DW8LD\nw8sitRCdIFtPO0xIUIv+CMb8SHzvxb5XJZjTtS+yXaJqKDOqf0EzP5VFAITYHZiw\njbwtPZRD7lwH66SMT97S+3zw9Sc9hwaWxjTjXkvPzR+4ytT7vcnwjw2AV5zYfwFo\nedCAYag5JIiRlOAMxmva5M2XCdkxLLqGqCLbGuHMlN6ke1nweVd+U1BCeYdkb1QC\nAQROWlAED1V+jzbjjRgbqZ8KeKvSFy15I47MHmIegQKBgQDfQ1mVRDOdooJ4z+++\nPaM7rEiyL+GPRAWnrBMWYMjDj+otf+O8HT2scg0GANPSv1emz1GsLonpMtcE4JM0\naGioPz13Ta37BqTrIqGMxXNW9mXx65VLVAq5JX9PjRTU2uXsdki2GsLjdxRuXcfR\nzQPm+iCS8Y5XUk3l68z7khyBdQKBgQDIvSiBYTP8rjCBVr0Mf5wWtvtKpdvD466d\nBeIFkzAFuMTzhCpefNhA56JlwKcUvdRNvouH54hvdbTcz7p+in4FaEs+GuAOodJb\nqKjJJZPQiPwWv8zxzn7qRfymv58fnPVpWNWE1JPQUkNhhEkQj9QqftVjWgDizvXF\nL2au49WGnQKBgQCmGIDo31hXCbNvFaMSMODjYASlK6Hu53gdiZKZr18svkBFoUNX\ni5l6VU8DDFKKEveujcYBBo5rAvucEUbyUkqqAIJF43BvtD21AIqXI73vEFg/Zjgn\nVlqz6wWPtTGuOTucc1Mcx0P93XVBtlsV5iPlDmh1aWev5vc0+fwBnG3AkQKBgQCv\nT1uXml9/llSwMCNMTgnwYH+X0r/aFPbDFYcuHTw8UwBWN5+VA20NSf4u5RBF8f7+\noqFS4GbsCJ0alqQlrSef61SC+Y+h17tR5zr46ENuRKP77ie7Kf729IZQzlrWjgpZ\npYZbyhcJQT6tZI021JWTQ09yxACwE9TaD6qapEkvlQKBgQDbGWGRulvD0FkcAH3A\na7Mkp4Y1Qa4mW3jJtHSJ/SIIcHRg7YoXCpO1NcbdIo6tAG+HV525a1b7dXZDB7Nk\nIZi12oRDokV3Y0d1rLVMDBv6IYf7j700GqyWyoBnUFaKKAK4WsSPjNsKJ3Dzn8rd\n70gjC0rVd2cqAPWcHyoHKvLddg==\n-----END PRIVATE KEY-----\n'
}*/

if(process.env.NODE_ENV === 'production'){
    module.exports=require('./prod');
}else{
    module.exports=require('./dev');
}