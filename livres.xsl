<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    xmlns:func="http://umontreal.ca/IFT3225/tp1"
    version="2.0">
    <xsl:output method="xhtml" indent="yes"/>
    
    <!-- the price interval -->
    <xsl:param name="min"/>
    <xsl:param name="max"/>
    
    <xsl:key name="auteur" match="auteur" use="@ident"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <meta charset="utf-8"></meta>
                <link rel="stylesheet" type="text/css" href="xsl.css"/>
            </head>
            <body>                
                <h1>Livres</h1>
                <!-- show books -->
                <xsl:call-template name="livres-template">
                    <xsl:with-param name="min" select="$min"/>
                    <xsl:with-param name="max" select="$max"/>
                    
                </xsl:call-template>
            </body>
        </html>
    </xsl:template>  
    
    <xsl:template name="livres-template">
        <xsl:param name="min"/>
        <xsl:param name="max"/>
        <table>
            <tr>
                <th>Titre</th>
                <th>Année</th>
                <th>Prix</th>
                <th>Auteurs</th>
            </tr>
            <xsl:choose>
                <!-- if both parametres are set, then filter the result -->
                <xsl:when test="($min and $max)">
                    <xsl:for-each select="/bibliotheque/livre[prix/valeur &lt;= $max and prix/valeur &gt;= $min]">
                        <!-- use first author to sort books -->
                        <xsl:sort select="func:author(.,/bibliotheque/auteur)" order="descending"/>
                        <xsl:call-template name="livre"/>
                    </xsl:for-each>
                </xsl:when>
                <xsl:when test="$min">
                    <xsl:for-each select="/bibliotheque/livre[prix/valeur &gt;= $min]">
                        <!-- use first author to sort books -->
                        <xsl:sort select="func:author(.,/bibliotheque/auteur)" order="descending"/>
                        <xsl:call-template name="livre"/>
                    </xsl:for-each>
                </xsl:when>
                <xsl:when test="$max">
                    <xsl:for-each select="/bibliotheque/livre[prix/valeur &lt;= $max]">
                        <!-- use first author to sort books -->
                        <xsl:sort select="func:author(.,/bibliotheque/auteur)" order="descending"/>
                        <xsl:call-template name="livre"/>
                    </xsl:for-each>
                </xsl:when>
                <!-- if no parameters set, return all the results -->
                <xsl:otherwise>
                    <xsl:for-each select="/bibliotheque/livre">
                        <!-- use first author to sort books -->
                        <xsl:sort select="func:author(.,/bibliotheque/auteur)" order="descending"/>
                        <xsl:call-template name="livre"/>
                    </xsl:for-each>
                </xsl:otherwise>
            </xsl:choose>
            <!-- select a book with the price in the given interval between min and max -->
            
        </table>    
    </xsl:template>
    
    <xsl:template name="livre" match="livre">
    <tr>
        <td><xsl:value-of select="titre"/></td>
        <td><xsl:value-of select="annee"/></td>
        <td><xsl:value-of select="concat(prix/valeur, ' ', prix/valeur/@monnaie)"/></td>
        <td>
        <xsl:variable name="input" select="/"/>
        <xsl:for-each select="tokenize(@auteurs, ' ')">
            <xsl:variable name="curr_ref" select="."/>
            <xsl:value-of select="key('auteur', $curr_ref, $input)/nom"/>
            <br/>
        </xsl:for-each>
        </td>
    </tr>
    </xsl:template>
    
    <xsl:function name="func:author">
        <xsl:param name="book"/>
        <xsl:param name="authors"/>
        <xsl:value-of select="$authors[@ident=tokenize($book/@auteurs, ' ')[1]]/nom"/>
    </xsl:function>
    
</xsl:stylesheet>