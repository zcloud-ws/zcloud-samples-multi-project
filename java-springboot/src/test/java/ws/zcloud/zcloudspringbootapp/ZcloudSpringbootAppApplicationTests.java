package ws.zcloud.zcloudspringbootapp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ZcloudSpringbootAppApplicationTests {

	@Test
	void contextLoads() {
		System.out.printf("Numer %d is positivo? %b\n", 1, this.isPositivo(1));
		System.out.printf("Numer %f is positivo? %b\n", 1.1, this.isPositivo(1.1));
		System.out.printf("Numer %f is positivo? %b\n", -1.1, this.isPositivo(-1.1));
		System.out.printf("Numer %d is positivo? %b\n", -1, this.isPositivo(-1));
	}

	public boolean isPositivo(double n) {
		return n >= 0;
	}

}
