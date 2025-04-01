package com.email_writer;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = "*")

public class EmailGeneratorController {
    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {
        String response = emailGeneratorService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(response);
    }

    // New POST method to verify that the code is working
    @PostMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        // Print message to the console or log (optional)
        System.out.println("Test endpoint hit! The code is working.");

        // Return a simple response
        return ResponseEntity.ok("Test endpoint is working!");
    }
}
