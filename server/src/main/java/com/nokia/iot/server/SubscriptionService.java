package com.nokia.iot.server;


import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.apache.commons.httpclient.methods.StringRequestEntity;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

@RestController
public class SubscriptionService {

    @RequestMapping("/subscription")
    public String Subscription(HttpServletRequest request, HttpServletResponse response, BufferedReader reader) throws IOException {
        String resStr = null;
        String wsdl = "http://52.80.95.56:8000/m2m/subscriptions?type=resources";
        System.out.println(wsdl);
        HttpClient htpClient = new HttpClient();
        PostMethod postMethod = new PostMethod(wsdl);

        postMethod.getParams().setParameter(HttpMethodParams.HTTP_CONTENT_CHARSET, "UTF-8");
        postMethod.getParams().setParameter(HttpMethodParams.SO_TIMEOUT, 5000);
        postMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER, new DefaultHttpMethodRetryHandler());

        postMethod.addRequestHeader( "Content-Type","application/json" );
        postMethod.addRequestHeader( "Accept", "application/json");
        postMethod.addRequestHeader("Authorization", "Basic dGVzdGh6ZWRnZTp0ZXN0SHplZGdlITIz");

//        String body = "" +
//                "{" +
//                "\"deletionPolicy\": 0," +
//                "\"groupName\": \"DM.TESTINV.TESTLWM2M.TESTHZEDGE\"," +
//                "\"resources\": [" +
//                "{" +
//                "\"conditions\":{" +
//                "\"pmin\":60," +
//                "\"steps\":1" +
//                " }," +
//                "\"resourcePath\": \"3304/0/5601\"" +
//                "}" +
//                "]," +
//                "\"subscriptionType\": \"resources\"" +
//                "}";

        String body = "" +
                "{" +
                "\"criteria\": {" +
                "\"serialNumbers\": [ " +
                "\"8657100077\"" +
                "]" +
                "}," +
                "\"deletionPolicy\": 0," +
                "\"groupName\": \"DM.TESTINV.TESTLWM2M.TESTHZEDGE\"," +
                "\"resources\": [" +
                "{" +
                "\"conditions\":{" +
                "\"pmin\":60," +
                "\"steps\":1" +
                " }," +
                "\"resourcePath\": \"6/0/0\"" +
                "}" +
                "]," +
                "\"subscriptionType\": \"resources\"" +
                "}";

//        String body = "" +
//        "{" +
//            "\"deletionPolicy\": 0," +
//                "\"groupName\": \"DM. TESTINV.TESTLWM2M.TESTHZEDGE\"," +
//                "\"resources\": [" +
//                "{" +
//        "\"conditions\":{" +
//            "\"pmin\":60," +
//                    "\"steps\":1" +
//        "}," +
//                        "\"resourcePath\": \"6/0/0\"" +
//                    "}" +
//                "],"+
//            "\"subscriptionType\": \"resources\"" +
//        "}";
//        String body = "" +
//        "{"
//            \"criteria": {
//
//            \"serialNumbers": [
//            \"8657100077"
//         ]
//        },
//            \"deletionPolicy": 0,
//                \"groupName": "DM.TESTINV.TESTLWM2M.TESTHZEDGE",
//                \"resources": [
//            {
//                \"conditions":{
//                "pmin":60,
//                        "steps":1
//                },
//                "resourcePath": "6/0/0"
//            }
//        ],
//            "subscriptionType": "resources"
//        }

        postMethod.setRequestEntity( new StringRequestEntity( body ) );

        try {
            int statusCode = htpClient.executeMethod(postMethod);
            System.out.println("statusCode:" + statusCode);
//            String resp = postMethod.getResponseBodyAsString();
//            System.out.println(resp);
            if (statusCode != HttpStatus.SC_ACCEPTED) {
                System.out.println("Method failed: " + postMethod.getStatusLine());
                return null;
            }
            byte[] responseBody = postMethod.getResponseBody();
            resStr = new String(responseBody, "UTF-8");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            postMethod.releaseConnection();
        }
        System.out.println(resStr.toString());
        postMethod.releaseConnection();

        return resStr;
    }

}
