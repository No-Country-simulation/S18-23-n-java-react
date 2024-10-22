package com.nocountry.rentify.security.jwt;

import com.nocountry.rentify.model.enums.TokenPurpose;
import com.nocountry.rentify.service.interfaces.TokenBlacklistService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import javax.crypto.SecretKey;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtTokenProvider {

  private final TokenBlacklistService tokenBlacklistService;

  @Value("${jwt.secret.key}")
  private String secretKey;

  @Value("${jwt.time.expiration}")
  private long sessionExpiration;

  @Value("${token.time.expiration}")
  private long tokenPurposeExpiration;

  private SecretKey getKey() {
    byte[] keyBytes = Decoders.BASE64.decode(secretKey);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  public String generateSessionToken(UserDetails userDetail) {
    return generateToken(new HashMap<>(), userDetail.getUsername(), sessionExpiration);
  }

  public String generateTokenForPurpose(UserDetails userDetail, TokenPurpose purpose) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("purpose", purpose.name());
    return generateToken(claims, userDetail.getUsername(), tokenPurposeExpiration);
  }

  private String generateToken(Map<String, Object> extraClaims, String subject, long expiration) {
    return Jwts.builder()
            .claims(extraClaims)
            .subject(subject)
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(Date.from(Instant.now().plusMillis(expiration)))
            .signWith(getKey(), Jwts.SIG.HS256)
            .compact();
  }

  public String getPurposeFromToken(String token){
    return this.getClaim(token, claims -> claims.get("purpose", String.class));
  }

  public String getUsernameFromToken(String token)  {
    return this.getClaim(token, Claims::getSubject);
  }

  private Claims getAllClaims(String token) {
    return Jwts.parser()
            .verifyWith(this.getKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
  }
  private <T> T getClaim(String token, Function<Claims, T> claimsResolver)  {
    final Claims claims = this.getAllClaims(token);
    return claimsResolver.apply(claims);
  }

  public boolean isTokenExpired(String token) {
    return getExpirationDate(token).before(new Date());
  }

  public LocalDateTime getTokenExpirationDate(String token) {
    Date date = getExpirationDate(token);
    return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
  }

  private Date getExpirationDate(String token) {
    return getClaim(token, Claims::getExpiration);
  }

  public boolean isTokenValid(String token, UserDetails user) {
    final String username = getUsernameFromToken(token);
    return (username.equals(user.getUsername()) &&
            !isTokenExpired(token) &&
            !tokenBlacklistService.isTokenInBlacklist(token));
  }

}
