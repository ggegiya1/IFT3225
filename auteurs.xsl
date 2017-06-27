<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xhtml" indent="yes"/>
    <!-- show all the authors if the template called without parameters-->
    <xsl:param name="auteur"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <meta charset="utf-8"></meta>
                <link rel="stylesheet" type="text/css" href="xsl.css"/>
            </head>
            <body>
                <h1>Auteurs</h1>
                <!-- show authors -->
                <xsl:call-template name="auteur-template">
                    <xsl:with-param name="auteur" select="$auteur"/>
                </xsl:call-template>
            </body>
        </html>
    </xsl:template>     
   
    <xsl:template name="auteur-template">
        <xsl:param name="auteur"/>
            <xsl:choose>
                <xsl:when test="$auteur">
                    <xsl:apply-templates select="/bibliotheque/auteur[nom=$auteur]"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="/bibliotheque/auteur"/>
                </xsl:otherwise>
            </xsl:choose> 
    </xsl:template>
    
    
    <xsl:template match="auteur">
        <xsl:variable name="curr_aut" select="@ident"/>
        <h2><xsl:value-of select="concat(prenom, ' ', nom)"/></h2>
        <h3>Livres:</h3>
        <table>
            <tr>
                <th>Titre</th>
                <th>Prix</th>
                <th>Année</th>
            </tr>
            <xsl:for-each select="/bibliotheque/livre">
                <xsl:sort select="prix/valeur" order="ascending"/>
                <xsl:variable name="livre_node" select="."/>
                <xsl:for-each select="tokenize(@auteurs, ' ')">
                    <xsl:variable name="curr_ref" select="."/>
                    <xsl:if test="$curr_aut=$curr_ref">
                        <tr>
                            <td><xsl:value-of select="$livre_node/titre"/></td>
                            <td><xsl:value-of select="concat($livre_node/prix/valeur, ' ', $livre_node/prix/valeur/@monnaie)"/></td>
                            <td><xsl:value-of select="$livre_node/annee"/></td>
                        </tr>
                    </xsl:if>
                </xsl:for-each>
            </xsl:for-each>
        </table>
    </xsl:template>
</xsl:stylesheet>