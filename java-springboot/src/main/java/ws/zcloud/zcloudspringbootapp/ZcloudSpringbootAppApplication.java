package ws.zcloud.zcloudspringbootapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class ZcloudSpringbootAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZcloudSpringbootAppApplication.class, args);
    }

    @GetMapping("/")
    public ResponseResult status() {
        return new ResponseResult("success");
    }

}
